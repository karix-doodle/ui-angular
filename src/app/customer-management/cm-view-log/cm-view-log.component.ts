import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CustomerManagementService } from '../services/customer-management-view.service';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { viewLogApi_Response } from '../models/customer-management.model';
import { saveAs } from 'file-saver';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';
import { CustomerMgmt } from '../../model/authorization.model';

@Component({
  selector: 'app-cm-view-log',
  templateUrl: './cm-view-log.component.html',
  styleUrls: ['./cm-view-log.component.css']
})

export class CmViewLogComponent implements OnInit {
  public params: any;
  viewLogData: viewLogApi_Response
  CmAuthControls: CustomerMgmt;
  fromTabName: string;

  constructor(
    private route: ActivatedRoute,
    private service: CustomerManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.CmAuthControls = this.authorizationService.authorizationState.customer_management;

    let startDate = moment().subtract(29, 'days').utcOffset(environment.UTC);
    let todate = moment().utcOffset(environment.UTC);
    let dayDiffer = todate.diff(startDate, 'days') + 1;
    this.params = {
      fromdate: startDate,
      todate: todate,
      dateselectiontype: "Last " + dayDiffer + " Days"
    }
  }

  ngOnInit() {
    this.fromTabName = this.route.snapshot.params.from;
    this.CustomerMangaementzViewLog();
  }

  CustomerMangaementzViewLog() {
    let data = {
      clientname: this.route.snapshot.params.name,
      esmeaddr: this.route.snapshot.params.id,
    }
    this.service.getviewLogDetails({ ...data, ...this.params }).subscribe(
      (res: viewLogApi_Response) => {
        this.viewLogData = res;
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  viewlistDownload() {
    let data = {
      clientname: this.route.snapshot.params.name,
      esmeaddr: this.route.snapshot.params.id,
    }

    this.service.getviewLogFileDownload({ ...data, ...this.params }).subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'CustomerViewLogData-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  getDateSelection(e) {
    console.log(e, '12344')
    let startDate = e.startDate;
    let todate = e.endDate;
    let dayDiffer = todate.diff(startDate, 'days') + 1;
    this.params = {
      fromdate: e.startDate,
      todate: e.endDate,
      dateselectiontype: "Last " + dayDiffer + " Days"
    }

    if (startDate && todate) {
      this.CustomerMangaementzViewLog();
    }
    console.log(this.params, '12344')
  }

}
