import { Component, OnInit } from '@angular/core';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtListing_ApiResponse, GtStatusupdate_ApiResponse, GtListing_TableDataList, GtListing_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-gt-listing',
  templateUrl: './gt-listing.component.html',
  styleUrls: ['./gt-listing.component.css']
})

export class GtListingComponent implements OnInit {
  gatewayDataRes: GtListing_ApiResponse;
  gatewayData: GtListing_Data;
  selectedType: GtListing_TableDataList[];
  sortingName: string;
  isDesc: boolean;

  searchvalue: string = ''

  GtMgmtAuthControls = null

  constructor(
    private gatewayManagementService: GatewayManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
  }

  ngOnInit() {
    this.GtListing_list();
  }

  downloadGatewayFile() {
    this.GtListing_download();
  }

  GtListing_list() {
    this.gatewayManagementService.GtListing_list().subscribe(
      (res: GtListing_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayDataRes = res;
          this.gatewayData = JSON.parse(JSON.stringify(this.gatewayDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtListing_download() {
    this.gatewayManagementService.GtListing_download().subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'GatewayListdata-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  selectType(type) {
    if (type === 'All') {
      this.GtListing_list();
    } else if (type == 'Only InActive' || type == 'Only Active') {
      let statusVal = type == 'Only InActive' ? 0 : 1;
      this.selectedType = this.gatewayDataRes.data.tabledata.filter(item => item.status == statusVal);
      this.gatewayData.data.tabledata = this.selectedType;
    } else if (type == 'Recently Modified') {
      this.selectedType = this.gatewayDataRes.data.tabledata.sort((val1, val2) => {
        let formatdate1 = val1.lastdate.split('/')[2] + '-' + val1.lastdate.split('/')[1] + '-' + val1.lastdate.split('/')[0]
        let formatdate2 = val2.lastdate.split('/')[2] + '-' + val2.lastdate.split('/')[1] + '-' + val2.lastdate.split('/')[0]
        let val1Format = formatdate1 + ' ' + val1.lasttime + '.0'
        let val2Format = formatdate2 + ' ' + val2.lasttime + '.0'
        return <any>new Date(val1Format) - <any>new Date(val2Format);
      });
      this.gatewayData.data.tabledata = this.selectedType.reverse();
    } else {
      this.selectedType = this.gatewayDataRes.data.tabledata.filter(item => item.gw_type.toLowerCase() === type.toLowerCase());
      this.gatewayData.data.tabledata = this.selectedType;
    }
  }

  handleStatus(id, name, status) {
    let data = {
      gw_id: id,
      gw_name: name,
      status: status == true ? 0 : 1,
    }
    let statusText = data.status == 1 ? 'Activate' : 'Inactivate';
    Swal.fire({
      title: 'Are you sure want to ' + statusText + ' the gateway "' + data.gw_id + '"?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.gatewayManagementService.GtListing_statusupdate(data).subscribe(
          (res: GtStatusupdate_ApiResponse) => {
            if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              // successAlert(res.message, res.responsestatus)
              this.GtListing_list();
            } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              errorAlert(res.message, res.responsestatus)
            }
          }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText)
          }
        );
      } else {
        this.GtListing_list();
      }
    })
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
