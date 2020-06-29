import { Component, OnInit } from '@angular/core';
import { BlillPlanSumary_ApiResponse, BillPlanSummary_Data } from '../models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { BillManagementService } from '../services/BillManagement/billplan-management.service';

@Component({
  selector: 'app-billplan-home',
  templateUrl: './billplan-home.component.html',
  styleUrls: ['./billplan-home.component.css']
})
export class BillplanHomeComponent implements OnInit {
  billpLanSummaryApiRespone: BlillPlanSumary_ApiResponse
  billPlanSummaryData: BillPlanSummary_Data
  constructor(private BillplanService: BillManagementService) { }

  ngOnInit() {

    this.getBillPalnSummary();
  }


  getBillPalnSummary(){
    this.BillplanService.getBillPlanMgmtSummary().subscribe(
      (res: BlillPlanSumary_ApiResponse) => {
        console.log(res);
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.billpLanSummaryApiRespone = res;
          this.billPlanSummaryData = JSON.parse(
            JSON.stringify(this.billpLanSummaryApiRespone.data)
          );
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus);
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }

}
