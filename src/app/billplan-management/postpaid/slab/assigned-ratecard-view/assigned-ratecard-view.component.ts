import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BillplanRatecardViewService } from 'src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service';
import {  RateCardSlabView_ApiRResponse, BillPlanCurrency_ApiResponse, BillPlanCurrency_Data } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';

@Component({
  selector: 'app-assigned-ratecard-view',
  templateUrl: './assigned-ratecard-view.component.html',
  styleUrls: ['./assigned-ratecard-view.component.css']
})
export class AssignedRatecardViewComponent implements OnInit {
  searchvalue: "";
  totalOperator: number;
  totalCountries: number;
  currency: string;
  ratecardname: string;
  slabratecard = [];
  rowArray = [];
  description;
  billplan_name:string
  billplan_id:number
  row_billplan:string
  currencySybmol: object = {
    bCurrency: "",
    nCurrency: "",
  };
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  constructor(
    private Route: ActivatedRoute,
    private route: Router,
    private ratecardviewservice: BillplanRatecardViewService,
    private billPlanservice: BillManagementService
  ) {}

  ngOnInit() {
    this.Route.params.subscribe((data: Params) => {
      this.ratecardviewservice.getRatecardSlabView(data).subscribe((res: RateCardSlabView_ApiRResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          console.log(res, '123456')
          this.row_billplan = res.data.row_billplan;
        this.totalCountries = res.data.totalcountry;
        this.totalOperator = res.data.totaloperator;
        this.currency = res.data.currency;
        this.ratecardname = res.data.ratecardname;
        this.slabratecard = res.data.slabratecard;
        this.rowArray = res.data.row;
        this.description = res.data.description
        this.billplan_name = res.data.billplan_name
        this.billplan_id = +res.data.billplan_id


       } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.responsestatus)
       }
    }, (error: HttpErrorResponse) => {
       errorAlert(error.message, error.statusText)
    }
    );
  });
  this.getBillPlanCurrency();
}

onClick(){
  this.route.navigate(['../'], { relativeTo: this.Route });
}
getBillPlanCurrency() {
  this.billPlanservice.BillPlancurrency().subscribe(
    (res: BillPlanCurrency_ApiResponse) => {
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.billPlanCurrencyRes = res;
        this.billPlanCurrencyData = JSON.parse(
          JSON.stringify(this.billPlanCurrencyRes)
        );
        let bcurrency = {};
        let ncurrency = {};
        this.billPlanCurrencyRes.data.filter((item) => {
          if (item.currency_id == environment.currencyDefault) {
            ncurrency = {
              symbol: item.currency_symbol,
              id: item.currency_id,
            };
          }
        });

        this.currencySybmol = {
          bCurrency: bcurrency,
          nCurrency: ncurrency,
        };
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
