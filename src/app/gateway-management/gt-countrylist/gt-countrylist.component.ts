import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetailsCountryList_ApiResponse, GtDetailsCountryList_Data, GtCountryStatusupdate_ApiResponse, GtSenderIdConfigCountryList_ApiResponse, GtSenderIdConfigCountryList_Data, GtSenderIdConfigOperatorList_ApiResponse, GtSenderIdConfigOperatorList_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-gt-countrylist',
  templateUrl: './gt-countrylist.component.html',
  styleUrls: ['./gt-countrylist.component.css']
})

export class GtCountrylistComponent implements OnInit {
  sendTestMsg: any[] = [1, 2, 3];

  GtDetailsCountryListRes: GtDetailsCountryList_ApiResponse;
  GtDetailsCountryList: GtDetailsCountryList_Data;
  GtSenderIdConfigCountryListRes: GtSenderIdConfigCountryList_ApiResponse;
  GtSenderIdConfigCountryList: GtSenderIdConfigCountryList_Data;
  GtSenderIdConfigOperatorListRes: GtSenderIdConfigOperatorList_ApiResponse;
  GtSenderIdConfigOperatorList: GtSenderIdConfigOperatorList_Data;

  sortingName: string;
  isDesc: boolean;

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  close(pop: any) {
    pop.close()
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.Gateway_CountryList();
    this.GtSenderIdConfigCountry_list()
  }

  toggleRateChange(popover, rlist: any, country: string, operator: string) {
    popover.open({ rlist, country, operator });
  }

  Gateway_CountryList() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.Gateway_CountryList(data).subscribe(
      (res: GtDetailsCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsCountryListRes = res;
          this.GtDetailsCountryList = JSON.parse(JSON.stringify(this.GtDetailsCountryListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  downloadCountryListFile() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.GtCountryListing_download(data).subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'GatewayCountryListdata-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  handleStatus(gid, status, id) {
    let data = {
      gw_id: gid,
      id: id,
      status: status == true ? 0 : 1,
    }
    let statusText = status != true ? 'Activate' : 'Inactivate';
    Swal.fire({
      title: 'Are you sure want to ' + statusText + ' the country?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.gatewayManagementService.GtCountry_statusupdate(data).subscribe(
          (res: GtCountryStatusupdate_ApiResponse) => {
            if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              // successAlert(res.message, res.responsestatus)
            } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              errorAlert(res.message, res.responsestatus)
            }
          }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText)
          }
        );
      } else {
        this.Gateway_CountryList();
      }
    })
  }

  GtSenderIdConfigCountry_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      load: 'country',
    }
    this.gatewayManagementService.GtSenderIdConfigCountry_list(data).subscribe(
      (res: GtSenderIdConfigCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderIdConfigCountryListRes = res;
          this.GtSenderIdConfigCountryList = JSON.parse(JSON.stringify(this.GtSenderIdConfigCountryListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  countrySelect(event) {
    if (event != "") {
      this.GtSenderIdConfigOperator_list(event)
    }
  }

  GtSenderIdConfigOperator_list(mccValue) {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      load: 'operator',
      mcc: mccValue
    }
    this.gatewayManagementService.GtSenderIdConfigOperator_list(data).subscribe(
      (res: GtSenderIdConfigOperatorList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderIdConfigOperatorListRes = res;
          this.GtSenderIdConfigOperatorList = JSON.parse(JSON.stringify(this.GtSenderIdConfigOperatorListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
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
