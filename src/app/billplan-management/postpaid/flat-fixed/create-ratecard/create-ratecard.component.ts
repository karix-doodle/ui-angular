import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillplanFlatFixedService } from 'src/app/billplan-management/services/BillManagement/billplan-country-flat-fixed/billplan-flat-fixed.service';
import { BillPlanCreateFlatFixed_ApiResponse, CurrencyRateRes, BillPlanCurrency_ApiResponse, BillPlanCurrency_Data, CurrencySybmol, Currency } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import { BillplanMgmt } from '../../../../model/authorization.model';

@Component({
   selector: 'app-create-ratecard',
   templateUrl: './create-ratecard.component.html',
   styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {
   Submitted = false
   fixedRateFrom: FormGroup
   billplan_id: number;
   billplan_currencyid
   ratecard_name
   ratecard_type = "flat-fixed"
   conversionRate: number
   currencySybmol: CurrencySybmol = new CurrencySybmol();
   bCurrency: Currency = new Currency();
   nCurrency: Currency = new Currency();
   billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
   billPlanCurrencyData: BillPlanCurrency_Data;
   billPlanMgmtAuthControls: BillplanMgmt;
   constructor(private formBuilder: FormBuilder,
      private billplanflat: BillplanFlatFixedService,
      private router: Router,
      private activeRoute: ActivatedRoute,
      private billPlanservice: BillManagementService,
      private authorizationService: AuthorizationService) {
      this.billPlanMgmtAuthControls = this.authorizationService.authorizationState.billplan_mgmt;
      this.billplan_id = +this.activeRoute.snapshot.params.bId
      this.billplan_currencyid = +this.activeRoute.snapshot.params.cId
      this.ratecard_name = this.activeRoute.snapshot.params.name
   }

   ngOnInit() {
      this.fixedRateFrom = this.formBuilder.group({
         billplan_id: +this.activeRoute.snapshot.params.bId,
         billplan_currencyid: +this.activeRoute.snapshot.params.cId,
         ratecard_name: this.activeRoute.snapshot.params.name,
         ratecard_type: ['flat-fixed'],
         billing_rate: ['', [Validators.required, Validators.pattern('^[1-9]{1}$|^[0-9]{2,10}$|^[0-9]{1}([\.][0-9]{1,6})$|^[0-9]{2,4}([\.][0-9]{1,6})?$')]],
         normalize_rate: [''],
         discount_rate: [''],
         discount_type: [''],
         description: ['']
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
               this.billPlanCurrencyRes.data.filter((item) => {
                  if (item.currency_id == this.activeRoute.snapshot.params.cId) {
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


   get control() {
      return this.fixedRateFrom.controls;
   }



   checkRate(data: Number, form: FormGroup, key: string) {

      let hasDot = data.toString().split('.')
      let BillingRate = data.toString();

      if (hasDot.length == 2) {
         if (RegExp('^[0]+$').test(hasDot[0])) {
            BillingRate = Number('0' + '.' + hasDot[0]).toString().replace(/^0+/, '') + Number('0' + '.' + hasDot[1]).toString().replace(/^0+/, '');
         } else {
            BillingRate = hasDot[0] + Number('0' + '.' + hasDot[1]).toString().replace(/^0+/, '');
         }
      } else if (hasDot.length == 1) {
         if (RegExp('^[0]+$').test(hasDot[0])) {
            BillingRate = '0'
         }
      }

      let dotIndex = BillingRate.indexOf('.')

      if (dotIndex == 0) {
         BillingRate = '0' + BillingRate
      }

      BillingRate = BillingRate != '' ? BillingRate : '0'

      if (form != undefined) {
         let obj = {}
         obj[key] = BillingRate
         form.patchValue(obj)
      }

      return BillingRate;
   }

   round(data, form: FormGroup) {
      let NormalizedRate = data == 0 ? 0 : (data * this.conversionRate).toFixed(6)
      let hasDot = NormalizedRate.toString().split('.')

      if (hasDot.length == 2) {
         if (RegExp('^[0]+$').test(hasDot[0])) {
            NormalizedRate = Number('0' + '.' + hasDot[0]).toString().replace(/^0+/, '') + Number('0' + '.' + hasDot[1]).toString().replace(/^0+/, '');
         } else {
            NormalizedRate = hasDot[0] + Number('0' + '.' + hasDot[1]).toString().replace(/^0+/, '');
         }
      } else if (hasDot.length == 1) {
         if (RegExp('^[0]+$').test(hasDot[0])) {
            NormalizedRate = '0'
         }
      }

      let dotIndex = NormalizedRate.toString().indexOf('.')

      if (dotIndex == 0) {
         NormalizedRate = '0' + NormalizedRate
      }

      if (form != undefined) {
         form.patchValue({
            normalize_rate: NormalizedRate
         })
      }
      return NormalizedRate
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
   handleDiscountType() {
      if (this.fixedRateFrom.value.discount_type == 'percentage') {
         this.fixedRateFrom.get('discount_rate').setValidators(
            [
               Validators.required,
               Validators.pattern('(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)'),
               Validators.max(99.99), Validators.min(0.01)
            ]
         );
         this.fixedRateFrom.get('discount_rate').updateValueAndValidity();
      } else if (this.fixedRateFrom.value.discount_type == 'unit') {
         this.fixedRateFrom.get('discount_rate').setValidators([Validators.required, Validators.pattern('^([0-9]+(\.[0-9]+)?)')]);
         this.fixedRateFrom.get('discount_rate').updateValueAndValidity();
      } else {
         this.fixedRateFrom.patchValue({
            discount_rate: ''
         })
         this.fixedRateFrom.get('discount_rate').clearValidators();
         this.fixedRateFrom.get('discount_rate').updateValueAndValidity();
      }
   }


   onSubmit() {
      console.log(this.fixedRateFrom.value)
      this.Submitted = true
      if (this.fixedRateFrom.valid) {
         this.Submitted = false
         this.billplanflat.BillPlanCreate(this.fixedRateFrom.value).subscribe(
            (res: BillPlanCreateFlatFixed_ApiResponse) => {
               if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
                  successAlert(res.message, res.responsestatus)
                  this.router.navigate(['billplan-management/postpaid/' + this.billplan_id + '/' + this.fixedRateFrom.value.ratecard_name]);
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
