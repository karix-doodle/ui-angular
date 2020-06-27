import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetailsViewLog_ApiResponse, GtDetailsViewLog_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

import * as moment from 'moment';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-gt-details-view-log',
  templateUrl: './gt-details-view-log.component.html',
  styleUrls: ['./gt-details-view-log.component.css']
})
export class GtDetailsViewLogComponent implements OnInit {

  GtDetailsViewLogRes: GtDetailsViewLog_ApiResponse;
  GtDetailsViewLog: GtDetailsViewLog_Data;
  public params: any;

  GtMgmtAuthControls = null

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
    console.log(this.GtMgmtAuthControls, 'adadasdas')
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
    this.GtDetails_ViewLog()
  }

  GtDetails_ViewLog() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name,
    }
    this.gatewayManagementService.GtDetails_ViewLog({ ...data, ...this.params }).subscribe(
      (res: GtDetailsViewLog_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsViewLogRes = res;
          this.GtDetailsViewLog = JSON.parse(JSON.stringify(this.GtDetailsViewLogRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
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
      this.GtDetails_ViewLog();
    }
  }

}
