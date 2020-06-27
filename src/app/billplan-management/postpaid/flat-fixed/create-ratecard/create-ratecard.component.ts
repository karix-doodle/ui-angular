import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillplanFlatFixedService } from 'src/app/billplan-management/services/BillManagement/billplan-country-flat-fixed/billplan-flat-fixed.service';
import { BillPlanCreateFlatFixed_ApiResponse, CurrencyRateRes, BillPlanCurrency_ApiResponse, BillPlanCurrency_Data } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {
Submitted = false
  fixedRateFrom: FormGroup
  billplan_id
  billplan_currencyid
  ratecard_name
  ratecard_type="flat-fixed"
  conversionRate: number
  currencySybmol: object = {
    bCurrency: '',
    nCurrency: ''
  }
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  constructor( private formBuilder: FormBuilder,
    private billplanflat: BillplanFlatFixedService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private billPlanservice: BillManagementService,) {
      this.billplan_id = +this.activeRoute.snapshot.params.bId
      this.billplan_currencyid = +this.activeRoute.snapshot.params.cId
      this.ratecard_name = this.activeRoute.snapshot.params.name
    }

  ngOnInit() {
  this.fixedRateFrom = this.formBuilder.group({
    billplan_id:  +this.activeRoute.snapshot.params.bId,
    billplan_currencyid:+this.activeRoute.snapshot.params.cId,
    ratecard_name:this.activeRoute.snapshot.params.name,
    ratecard_type:['flat-fixed'],
    billing_rate:['',[Validators.required, Validators.pattern('[0-9.]{6,6}')]],
    normalize_rate:[''],
    discount_rate:[''],
    discount_type:['percentage'],
    description:['']
  })
this.initCurrencyConversion();
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
          let bcurrency = {}
          let ncurrency = {}
          this.billPlanCurrencyRes.data.filter((item) => {
            if (item.currency_id == this.activeRoute.snapshot.params.cId) {
              bcurrency = {
                symbol: item.currency_symbol,
                id: item.currency_id
              }
            }
            if (item.currency_id == environment.currencyDefault) {
              ncurrency = {
                symbol: item.currency_symbol,
                id: item.currency_id
              }
            }
          })

          this.currencySybmol = {
            bCurrency: bcurrency,
            nCurrency: ncurrency
          }

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

  get control() {
    return this.fixedRateFrom.controls;
  }


  round(data) {
    return data * this.conversionRate;
 }
 // ------------------- common ----------------------------------

 // ------------------- Parent(First) Form -------------------
 initCurrencyConversion() {
    this.billPlanservice.getCurrencyRate(this.fixedRateFrom.value.billplan_currencyid).subscribe(
       (res: CurrencyRateRes) => {
          if (
             res.responsestatus === environment.APIStatus.success.text &&
             res.responsecode > environment.APIStatus.success.code
          ) {
             this.conversionRate = +res.data.conversion_rate;
             // console.log(this.conversionRate);
          } else if (
             res.responsestatus === environment.APIStatus.error.text &&
             res.responsecode < environment.APIStatus.error.code
          ) {
             errorAlert(res.message, res.responsestatus);
          }
       }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
       }
    );
 }


  onSubmit(){
    console.log(this.fixedRateFrom.value)
    this.Submitted = true
    if(this.fixedRateFrom.valid){
      this.billplanflat.BillPlanCreate(this.fixedRateFrom.value).subscribe(
        (res: BillPlanCreateFlatFixed_ApiResponse) => {
           if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              successAlert(res.message, res.responsestatus)
              this.router.navigate(['billplan-management']);
           } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              errorAlert(res.message, res.responsestatus)
           }
        }, (error: HttpErrorResponse) => {
           errorAlert(error.message, error.statusText)
        }
     );
    }
  }

}
