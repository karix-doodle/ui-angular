import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  LCRList, GatewayList, LCRStatusUpdate, LCRStatusUpdateRes,
  LCRStatusUpdateList
} from '../models/RouteManagement/LeastCastRouting/lcr';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { LcrService } from '../services/RouteManagement/LeastCostRouting/lcr.service';
import { errorAlert, successAlert } from '../../shared/sweet-alert/sweet-alert';
@Component({
  selector: 'app-rm-lcr',
  templateUrl: './rm-lcr.component.html',
  styleUrls: ['./rm-lcr.component.css']
})
export class RmLcrComponent implements OnInit {

  originalLCRListRes: LCRList;
  LCRListRes: LCRList;
  Gateways: GatewayList;
  originalGateways: GatewayList;
  selectedRoute: GatewayList[];
  searchText: any = '';
  LCRUpdateStatusInputs: LCRStatusUpdate = new LCRStatusUpdate();
  sortingName: string;
  isDesc: boolean;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private lcrService: LcrService
  ) { }

  ngOnInit() {
    this.loadLCRList();
  }

  /**
   * @description gets Least Cost Routing List
   */
  loadLCRList() {
    this.lcrService.getLCRList().subscribe(
      (res: LCRList) => {
        if (
          res.responsestatus === environment.APIStatus.success.text
          && res.responsecode > environment.APIStatus.success.code
        ) {
          this.originalLCRListRes = res;
          this.LCRListRes = JSON.parse(JSON.stringify(this.originalLCRListRes));
        } else if (
          res.responsestatus === environment.APIStatus.error.text
          && res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.message, res.responsestatus);
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
  /**
   * @param LCRUpdateStatusInputs consists of user credentials and activated and deactivated gateways status
   * @description to update the status of activated and deactivated gateway.
   */
  onSave() {
    if (this.LCRUpdateStatusInputs.list.length) {
      this.lcrService.updateGatewayStatus(this.LCRUpdateStatusInputs).subscribe(
        (res: LCRStatusUpdateRes) => {
          this.modalService.dismissAll();
          if (
            res.responsestatus === environment.APIStatus.success.text
            && res.responsecode > environment.APIStatus.success.code
          ) {
            this.loadLCRList();
            successAlert(res.message, res.responsestatus);
          } else if (
            res.responsestatus === environment.APIStatus.error.text
            && res.responsecode < environment.APIStatus.error.code
          ) {
            errorAlert(res.message, res.responsestatus);
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
    }
  }
  /**
   * @param country selected country name
   * @description to filter the LCR list respectively selected country.
   */
  selectCountry(country) {
    if (country === 'All') {
      this.LCRListRes = JSON.parse(JSON.stringify(this.originalLCRListRes));
    } else {
      this.selectedRoute = this.originalLCRListRes.data.gateways.filter(countryStr => countryStr.country === country);
      this.LCRListRes.data.gateways = [];
      this.LCRListRes.data.gateways = this.selectedRoute;
    }
  }
  /**
   * @param content consists of popup modal name
   * @param gateways consists gateway list data for active and inactive popup.
   * @description 1) open popup ,2) assign the gateway list data to popup, 3) create the request
   *               body for updateGatewayStatus api.
   */
  onRow(content, gateways: GatewayList) {
    this.originalGateways = gateways;
    // Take copy
    this.Gateways = JSON.parse(JSON.stringify(gateways));
    this.modalService.open(content, { windowClass: 'gt-detail-modal' });
    // this.modalService.open(content, { centered: true });
    this.LCRUpdateStatusInputs.loggedinempid = environment.loggedinempid;
    this.LCRUpdateStatusInputs.loggedinusername = environment.loggedinusername;
    this.LCRUpdateStatusInputs.list = [];
  }

  /**
   * @param e consists of change events of gateway toggle switch.
   * @param mcc consists of particular gateway mcc no. .
   * @param gateway consists of change events of gateway toggle switch.
   * @param gateways consists of particular gateway list data.
   * @description 1) to switch the toggle switch, 2) to add the new gateways into the request
   *               body for updateGatewayStatus api.
   */
  toggleStatus(e, mcc: number, gateway: LCRStatusUpdateList) {
    gateway.status = (e.target.checked) ? 1 : 0;
    if (!this.LCRUpdateStatusInputs.list.find(({ id }) => id === gateway.id)) {
      this.LCRUpdateStatusInputs.list.push({ mcc, ...gateway });
    } else if (this.LCRUpdateStatusInputs.list.find(({ id }) => id === gateway.id)) {
      this.LCRUpdateStatusInputs.list.forEach((gate: LCRStatusUpdateList) => {
        if (gateway.id === gate.id) {
          gate.status = gateway.status;
        }
      });
    }
  }
  /**
   * @param mcc consists of particular country mcc no. .
   * @description to reset the popup.
   */
  onPopupCancel(mcc: number) {
    // mcc: number
    // Reset
    this.LCRUpdateStatusInputs.list = [];
    this.Gateways = JSON.parse(JSON.stringify(this.originalGateways));
    this.modalService.dismissAll();
    // this.Gateways.direct.map((element) => {
    //   element.status = 0;
    //   this.LCRUpdateStatusInputs.list.push({ mcc, ...element });
    // });
    // this.Gateways.premium.map((element) => {
    //   element.status = 0;
    //   this.LCRUpdateStatusInputs.list.push({ mcc, ...element });
    // });
    // this.Gateways.wholesale.map((element) => {
    //   element.status = 0;
    //   this.LCRUpdateStatusInputs.list.push({ mcc, ...element });
    // });
    // console.log(this.LCRUpdateStatusInputs);
  }

  /**
   *
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }

}
