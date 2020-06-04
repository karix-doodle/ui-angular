import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetailsViewLog_ApiResponse, GtDetailsViewLog_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

import * as moment from 'moment';

@Component({
  selector: 'app-gt-details-view-log',
  templateUrl: './gt-details-view-log.component.html',
  styleUrls: ['./gt-details-view-log.component.css']
})
export class GtDetailsViewLogComponent implements OnInit {

  GtDetailsViewLogRes: GtDetailsViewLog_ApiResponse;
  GtDetailsViewLog: GtDetailsViewLog_Data;
  public params: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) {
    let startDate = moment().subtract(9, 'days');
    let todate = moment();
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
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          })
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        })
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
