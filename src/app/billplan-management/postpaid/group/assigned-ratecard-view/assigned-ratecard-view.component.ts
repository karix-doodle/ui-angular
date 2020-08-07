import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BillplanRatecardViewService } from 'src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service';
import { RateCardCountryOperatorView_ApiRResponse, RateCardGroupView_ApiRResponse, BillPlanCurrency_ApiResponse, BillPlanCurrency_Data, CurrencySybmol, Currency } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import { BillplanMgmt } from '../../../../model/authorization.model';

@Component({
  selector: 'app-assigned-ratecard-view',
  templateUrl: './assigned-ratecard-view.component.html',
  styleUrls: ['./assigned-ratecard-view.component.css']
})
export class AssignedRatecardViewComponent implements OnInit {
  searchvalue: string =''
  totalgroup: number;
  totalCountries: number;
  currency: string;
  ratecardname: string;
  countryArray = [];
  rowArray = [];
  roc = []
  roc_billplan: string;
  row_billplan: string;
  billplan_name:string
  billplan_id:number
  description;
  currencySybmol: CurrencySybmol = new CurrencySybmol();
  bCurrency: Currency = new Currency();
  nCurrency: Currency = new Currency();
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  billPlanMgmtAuthControls: BillplanMgmt;
  constructor(
    private Route: ActivatedRoute,
    private ratecardviewservice: BillplanRatecardViewService,
    private billPlanservice: BillManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.billPlanMgmtAuthControls = this.authorizationService.authorizationState.billplan_mgmt;
  }

  ngOnInit() {
    this.Route.params.subscribe((data: Params) => {
      this.ratecardviewservice.getRatecardGroupView(data).subscribe((res: RateCardGroupView_ApiRResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          // console.log(res, 'asasass')
        this.roc_billplan = res.data.roc_billplan;
        this.row_billplan= res.data.row_billplan
        this.totalCountries = res.data.totalcountry;
        this.totalgroup = res.data.totalgroup;
        this.currency = res.data.currency;
        this.ratecardname = res.data.ratecardname;
        this.countryArray = res.data.countryratecard;
        this.roc= res.data.roc
        this.rowArray = res.data.row
        this.description = res.data.description;
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
