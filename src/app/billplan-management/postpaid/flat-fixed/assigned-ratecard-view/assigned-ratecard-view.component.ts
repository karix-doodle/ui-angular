import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BillplanRatecardViewService } from 'src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service';
import { RateCardCountryView_ApiRResponse, BillPlanCurrency_ApiResponse, BillPlanCurrency_Data, RateCardViewFlatFixedApi_Response, CurrencySybmol, Currency } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
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

  billplan_id: number;
  billplan_name: string
  currency: string
  ratecardname: string;
  billing_rate: string
  normalizerate: number
  description: string
  discount_percentage: number
  currencySybmol: CurrencySybmol = new CurrencySybmol();
  bCurrency: Currency = new Currency();
  nCurrency: Currency = new Currency();
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  constructor(
    private Route: ActivatedRoute,
    private ratecardviewservice: BillplanRatecardViewService,
    private billPlanservice: BillManagementService
  ) {
    this.getBillPlanCurrency();
  }

  ngOnInit() {
    this.Route.params.subscribe((data: Params) => {
      this.ratecardviewservice.getRatecardfFlatFixedView(data).subscribe((res: RateCardViewFlatFixedApi_Response) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
        this.currency = res.data.currency;
        this.ratecardname = res.data.ratecardname;
        this.billing_rate = res.data.billing_rate
        this.normalizerate = res.data.normalizerate;
        this.discount_percentage = res.data.discount_percentage
        this.description = res.data.description;
        this.billplan_id = +res.data.billplan_id
        this.billplan_name = res.data.billplan_name

       } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.responsestatus)
       }
    }, (error: HttpErrorResponse) => {
       errorAlert(error.message, error.statusText)
    }
    );
  });



}

getBillPlanCurrency() {
  this.billPlanservice.BillPlancurrency().subscribe(
    (res: BillPlanCurrency_ApiResponse) => {
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {

        this.billPlanCurrencyRes = res;
        this.billPlanCurrencyData = JSON.parse(JSON.stringify(this.billPlanCurrencyRes));
        this.billPlanCurrencyRes.data.filter((item) => {
          if (item.currency_id == this.Route.snapshot.params.cId) {
            this.bCurrency.symbol = item.currency_symbol;
            this.bCurrency.id = item.currency_id;
          }
          if (item.currency_id == environment.currencyDefault) {
            this.nCurrency.symbol = item.currency_symbol;
            this.nCurrency.id = item.currency_id;
          }
        });
        this.currencySybmol.bCurrency = this.bCurrency;
        this.currencySybmol.nCurrency = this.nCurrency;


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
