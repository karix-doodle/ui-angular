import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtFileAuditFileLog_ApiResponse, GtFileAuditFileLog_Data, GtFileAuditFileLog_TableDataList, GtFileAuditFileCountry_ApiResponse, GtFileAuditFileCountry_Data, GtFileAuditFileOperator_ApiResponse, GtFileAuditFileOperator_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-gt-file-audit-log-view',
  templateUrl: './gt-file-audit-log-view.component.html',
  styleUrls: ['./gt-file-audit-log-view.component.css']
})
export class GtFileAuditLogViewComponent implements OnInit {

  gatewayFileAuditFileLogDataRes: GtFileAuditFileLog_ApiResponse;
  gatewayFileAuditFileLogData: GtFileAuditFileLog_Data;

  selectedCountryType: GtFileAuditFileLog_TableDataList[];
  selectedOperatorType: GtFileAuditFileLog_TableDataList[];

  GtFileAuditFileCountryDataRes: GtFileAuditFileCountry_ApiResponse;
  GtFileAuditFileCountryData: GtFileAuditFileCountry_Data;

  GtFileAuditFileOperatorDataRes: GtFileAuditFileOperator_ApiResponse;
  GtFileAuditFileOperatorData: GtFileAuditFileOperator_Data;

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
  ) { }

  ngOnInit() {
    this.GtFileAuditFileLog_list();
    this.GtFileAuditFileCountry_list();
    this.GtFileAuditFileOperator_list();
  }

  GtFileAuditFileLog_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      ga_name: this.activeRoute.snapshot.params.name,
      uuid: this.activeRoute.snapshot.params.uuid,
    }
    this.gatewayManagementService.GtFileAuditFileLog_list(data).subscribe(
      (res: GtFileAuditFileLog_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayFileAuditFileLogDataRes = res;
          this.gatewayFileAuditFileLogDataRes.data.gw_name = this.activeRoute.snapshot.params.name
          this.gatewayFileAuditFileLogData = JSON.parse(JSON.stringify(this.gatewayFileAuditFileLogDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtFileAuditFileCountry_list() {
    let data = {
      uuid: this.activeRoute.snapshot.params.uuid,
    }
    this.gatewayManagementService.GtFileAuditFileCountry_list(data).subscribe(
      (res: GtFileAuditFileCountry_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtFileAuditFileCountryDataRes = res;
          this.GtFileAuditFileCountryData = JSON.parse(JSON.stringify(this.GtFileAuditFileCountryDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtFileAuditFileOperator_list() {
    let data = {
      uuid: this.activeRoute.snapshot.params.uuid,
    }
    this.gatewayManagementService.GtFileAuditFileOperator_list(data).subscribe(
      (res: GtFileAuditFileOperator_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtFileAuditFileOperatorDataRes = res;
          this.GtFileAuditFileOperatorData = JSON.parse(JSON.stringify(this.GtFileAuditFileOperatorDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  selectCountryOperator(countryValue, operatorValue) {
    if (countryValue == 'All' && operatorValue == 'All') {
      this.selectedCountryType = this.gatewayFileAuditFileLogDataRes.data.tabledata;
      this.gatewayFileAuditFileLogData.data.tabledata = this.selectedCountryType;
    } else if (countryValue != 'All' && operatorValue == 'All') {
      this.selectedCountryType = this.gatewayFileAuditFileLogDataRes.data.tabledata.filter(item => item.mcc == countryValue);
      this.gatewayFileAuditFileLogData.data.tabledata = this.selectedCountryType;
    } else if (countryValue == 'All' && operatorValue != 'All') {
      this.selectedCountryType = this.gatewayFileAuditFileLogDataRes.data.tabledata.filter(item => item.mnc == operatorValue);
      this.gatewayFileAuditFileLogData.data.tabledata = this.selectedCountryType;
    } else {
      this.selectedCountryType = this.gatewayFileAuditFileLogDataRes.data.tabledata.filter(item => (item.mcc == countryValue && item.mnc == operatorValue));
      this.gatewayFileAuditFileLogData.data.tabledata = this.selectedCountryType;
    }
  }

}
