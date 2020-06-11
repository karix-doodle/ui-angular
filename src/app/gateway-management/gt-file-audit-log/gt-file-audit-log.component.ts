import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtFileAuditLog_ApiResponse, GtFileAuditLog_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { saveAs } from 'file-saver';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

import * as moment from 'moment';

@Component({
  selector: 'app-gt-file-audit-log',
  templateUrl: './gt-file-audit-log.component.html',
  styleUrls: ['./gt-file-audit-log.component.css']
})
export class GtFileAuditLogComponent implements OnInit {
  gatewayFileAuditLogDataRes: GtFileAuditLog_ApiResponse;
  gatewayFileAuditLogData: GtFileAuditLog_Data;
  public params: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
  ) {
    let startDate = moment().subtract(9, 'days').utcOffset(environment.UTC);
    let todate = moment().utcOffset(environment.UTC);
    let dayDiffer = todate.diff(startDate, 'days') + 1;
    this.params = {
      fromdate: startDate,
      todate: todate,
      dateselectiontype: "Last " + dayDiffer + " Days"
    }
  }

  ngOnInit() {
    this.GtFileAuditLog_list();
  }

  GtFileAuditLog_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      ga_name: this.activeRoute.snapshot.params.name,
    }
    this.gatewayManagementService.GtFileAuditLog_list({ ...data, ...this.params }).subscribe(
      (res: GtFileAuditLog_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayFileAuditLogDataRes = res;
          this.gatewayFileAuditLogDataRes.data.gw_name = this.activeRoute.snapshot.params.name
          this.gatewayFileAuditLogData = JSON.parse(JSON.stringify(this.gatewayFileAuditLogDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  downloadFileAuditLogFile(item) {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      filename: item
    }
    this.gatewayManagementService.GtFileAuditLog_download(data).subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/' + item.split('.')[1] });
        let fileName = 'GatewayFileAuditLog-' + new Date().toLocaleString()
        saveAs(blob, fileName + "." + item.split('.')[1]);
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  getDateSelection(e) {
    let startDate = e.startDate;
    let todate = e.endDate;
    let dayDiffer = todate.diff(startDate, 'days') + 1;
    this.params = {
      fromdate: e.startDate,
      todate: e.endDate,
      dateselectiontype: "Last " + dayDiffer + " Days"
    }
    if (startDate && todate) {
      this.GtFileAuditLog_list();
    }
  }

}
