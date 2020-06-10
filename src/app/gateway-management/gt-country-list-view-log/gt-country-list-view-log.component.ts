import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtCountryListViewLog_ApiResponse, GtCountryListViewLog_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

import * as moment from 'moment';

@Component({
  selector: 'app-gt-country-list-view-log',
  templateUrl: './gt-country-list-view-log.component.html',
  styleUrls: ['./gt-country-list-view-log.component.css']
})
export class GtCountryListViewLogComponent implements OnInit {

  GtCountryListViewLogDataRes: GtCountryListViewLog_ApiResponse;
  GtCountryListViewLogData: GtCountryListViewLog_Data;

  public params: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
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
    this.GtCountryListView_Log()
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
      this.GtCountryListView_Log();
    }
  }

  GtCountryListView_Log() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      country: this.activeRoute.snapshot.params.country,
      operator: this.activeRoute.snapshot.params.operator,
    }
    this.gatewayManagementService.GtCountryListView_Log({ ...data, ...this.params }).subscribe(
      (res: GtCountryListViewLog_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtCountryListViewLogDataRes = res;
          this.GtCountryListViewLogDataRes.data.gw_id = this.activeRoute.snapshot.params.id
          this.GtCountryListViewLogDataRes.data.gw_name = this.activeRoute.snapshot.params.name
          this.GtCountryListViewLogData = JSON.parse(JSON.stringify(this.GtCountryListViewLogDataRes));
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

}