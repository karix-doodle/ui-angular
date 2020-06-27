import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BillplanRatecardViewService } from "src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service";
import {
  RateCardCountryOperatorView_ApiRResponse,
  BillPlanCurrency_ApiResponse,
  BillPlanCurrency_Data,
} from "src/app/billplan-management/models/BillManagement/blillplan.models";
import { environment } from "src/environments/environment";
import { errorAlert } from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";

@Component({
  selector: "app-assigned-ratecard-view",
  templateUrl: "./assigned-ratecard-view.component.html",
  styleUrls: ["./assigned-ratecard-view.component.css"],
})
export class AssignedRatecardViewComponent implements OnInit {
  searchvalue: string = "";
  totalOperator: number;
  totalCountries: number;
  currency: string;
  ratecardname: string;
  countryArray = [];
  rowArray = [];
  billplan_name: string;
  billplan_id: number;
  row_billplan: string;
  description;
  currencySybmol: object = {
    bCurrency: "",
    nCurrency: "",
  };
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  constructor(
    private Route: ActivatedRoute,
    private ratecardviewservice: BillplanRatecardViewService,
    private billPlanservice: BillManagementService
  ) {}

  ngOnInit() {
    this.Route.params.subscribe((data: Params) => {
      console.log(data);
      this.ratecardviewservice.getRatecardCountryOperatorView(data).subscribe(
        (res: RateCardCountryOperatorView_ApiRResponse) => {
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            this.row_billplan = res.data.row_billplan;
            this.totalCountries = res.data.totalcountry;
            this.totalOperator = res.data.totaloperator;
            this.currency = res.data.currency;
            this.ratecardname = res.data.ratecardname;
            this.countryArray = res.data.countryratecard;
            this.description = res.data.description;
            this.rowArray = res.data.row;
            this.billplan_name = res.data.billplan_name;
            this.billplan_id = +res.data.billplan_id;
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
