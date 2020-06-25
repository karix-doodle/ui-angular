import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SlabRouteService } from '../../../services/BillManagement/Slab/slab-route.service';
import { Countries, Slabs, SlabCreateRateCardBody, SlabCreateRateCardRes } from '../../../models/BillManagement/Slab/slab.model';
import { Observable, Subscription } from 'rxjs';
import { errorAlert, confirmAlert, successAlert } from '../../../../shared/sweet-alert/sweet-alert';
import { MatStepper } from '@angular/material';
import { BillManagementService } from '../../../services/BillManagement/billplan-management.service';
import {
   BillPlanContinent_ApiRespone, BillPlanCountries_ApiRespone, BillPlanCountries_Data,
   BillPlanOperator_ApiRespone,
   BillPlanOperator_Data,
   CurrencyRateRes
} from '../../../models/BillManagement/blillplan.models';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
   selector: 'app-slab-stepper-form',
   templateUrl: './slab-stepper-form.component.html',
   styleUrls: ['./slab-stepper-form.component.css']
})
export class SlabStepperFormComponent implements OnInit, OnDestroy {

   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   countrySlabInput: Countries = new Countries();
   SlabCreateRateCardInput: SlabCreateRateCardBody = new SlabCreateRateCardBody();
   editModeState: boolean;
   editModeIndex: number;
   sub: Subscription;
   firstStepSubmitted: boolean;
   @Input() parentForm: FormGroup;
   @Input() editMode: Observable<[boolean, number, string]>;
   @Output() countriesListChildToParent = new EventEmitter();
   secondStepSubmitted: boolean;
   continentList: string[];
   countriesList: BillPlanCountries_Data[];
   // continentListCopy: BillPlanCountries_Data[];
   operatorsList: BillPlanOperator_Data[];
   conversionRate: number;
   // focusedFormArrayIndex: number;
   constructor(
      private formBuilder: FormBuilder,
      config: NgbModalConfig,
      private slabRouteService: SlabRouteService,
      private billMgmtService: BillManagementService,
      private router: Router,
   ) { }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }
   ngOnInit() {
      this.firstStepSubmitted = false;
      this.secondStepSubmitted = false;
      // this.focusedFormArrayIndex = 0;
      this.initSecondForm();
      this.initEditModeSubscription();
      this.initContinentSubscription();
      this.initCountrySubscription('');
      this.initCurrencyConversion();
      // this.initFirstFormArrayValueChangesSubscription();
      // this.initSecondFormArrayValueChangesSubscription();


   }

   // ------------------- common -------------------
   createSlabsItem(min?: number, max?: number): FormGroup {
      // console.log(min, max);
      return this.formBuilder.group({
         min: min === undefined ? [1] : [min],
         max: max === undefined ?
            [999999999, [Validators.required, Validators.min(2), Validators.max(999999999)]]
            : [max, [Validators.required, Validators.min(2), Validators.max(999999999)]],
         billing_rate: ['', [Validators.required, Validators.pattern('[0-9.]{6,6}')]],
         normalize_rate: ['']
      });
   }
   onNext(stepper: MatStepper) {
      // console.log(this.parentForm);
      if (!this.editModeState) {
         if (this.slabRouteService.previewList.length) {
            if (this.parentForm.touched || this.parentForm.dirty) {
               confirmAlert('Your unsaved data will get erassed', 'Yes, delete it!')
                  .then((result) => {
                     if (result.isConfirmed) {
                        stepper.next();
                        this.parentFormReset();
                     }
                  });
            } else {
               stepper.next();
            }
         } else {
            errorAlert('Add at least one country & operator', 'warning');
         }
      } else {
         errorAlert('You are in edit mode', 'Warning');
      }

   }
   // setIndex(index) {
   //    // on bill rate card gain focus
   //    // console.log(index);
   //    this.focusedFormArrayIndex = index;
   // }
   // onBlur(index) {
   //    // on bill rate card lose focus
   //    // console.log(index);
   //    this.focusedFormArrayIndex = undefined;
   // }
   round(data) {
      return data * this.conversionRate;
   }
   // ------------------- common ----------------------------------

   // ------------------- Parent(First) Form -------------------
   initCurrencyConversion() {
      this.billMgmtService.getCurrencyRate(this.parentForm.value.billplan_currencyid).subscribe(
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
   // initFirstFormArrayValueChangesSubscription() {
   //    const slabs = this.firstFormArray;
   //    this.sub = slabs.valueChanges
   //       .pipe(
   //          debounceTime(100),
   //          distinctUntilChanged()
   //       )
   //       .subscribe(data => {
   //          // console.log(data[this.focusedFormArrayIndex]);
   //          if (data[this.focusedFormArrayIndex] !== undefined) {
   //             slabs.at(this.focusedFormArrayIndex).get('normalize_rate').patchValue(
   //                data[this.focusedFormArrayIndex].billing_rate * this.conversionRate
   //                , { onlySelf: true }
   //             );
   //          }
   //       });
   // }
   initContinentSubscription() {
      this.billMgmtService.getContinentList()
         .subscribe((res: string[]) => {
            this.continentList = res;
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         });
   }
   initCountrySubscription(countryName?: string) {
      this.billMgmtService.getCountryList({ continent: countryName })
         .subscribe((res: BillPlanCountries_ApiRespone) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.countriesList = res.data;
               // this.continentListCopy = JSON.parse(JSON.stringify(res.data));
               if (countryName !== '') {
                  this.operatorsList = [];
                  this.parentForm.patchValue({
                     country_name: '',
                     operator_name: ''
                  });
               }

            } else if (
               res.responsestatus === environment.APIStatus.error.text &&
               res.responsecode < environment.APIStatus.error.code
            ) {
               errorAlert(res.message, res.responsestatus);
            }
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         });
   }
   initOperatorSubscription(countryName: string) {
      let country;
      this.countriesList.forEach(element => {
         if (element.country === countryName) {
            country = element;
            this.parentForm.patchValue({
               mcc: element.mcc,
               operator_name: ''
            }); // add mcc
         }
      });
      // console.log(country);
      this.billMgmtService.getOperatorList(country)
         .subscribe((res: BillPlanOperator_ApiRespone) => {
            if (res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code) {
               this.operatorsList = res.data;
            } else if (
               res.responsestatus === environment.APIStatus.error.text &&
               res.responsecode < environment.APIStatus.error.code
            ) {
               errorAlert(res.message, res.responsestatus);
            }
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         });
   }
   operatorDropOnChange(operatorName: string) {
      // console.log(operatorName);
      this.operatorsList.forEach(element => {
         if (element.operator === operatorName) {
            this.parentForm.patchValue({ mnc: element.mnc }); // add mnc
         }
      });
   }
   initEditModeSubscription() {
      this.editModeState = false;
      this.sub = this.editMode.subscribe(([value, index, editCountry]) => {
         this.editModeState = value; // value = true;
         this.editModeIndex = index;
         this.initOperatorSubscription(editCountry);
         // console.log(this.editModeIndex);
      });
   }
   get firstFormArray(): FormArray {
      // return this.parentForm.get('slabs') as FormArray;
      return this.slabRouteService.formArray(this.parentForm, 'slabs');
   }
   addToSlabsFirstFormArray() {
      this.firstStepSubmitted = true;
      const slabs = this.firstFormArray;
      if (slabs.valid) {
         this.firstStepSubmitted = false;
         const index = slabs.value.length - 1;
         const max = slabs.value[index].max;
         const min = slabs.value[index].min;
         if (min < max) {
            if (max < 999999998) {
               slabs.push(this.createSlabsItem(+max + 1, undefined));
            } else {
               errorAlert('You have reached your maximum limit', 'Warning');
            }
         } else {
            errorAlert('Max limit must be greater than Min limit', 'Warning');
         }
      }
   }
   removeFromSlabsFirstFormArray(index) {
      const slabs = this.firstFormArray;
      const max = slabs.value[index].max;
      const min = slabs.value[index].min;
      if (slabs.length > 1) {
         slabs.at(index - 1).patchValue({ max });
         slabs.removeAt(index);
      }
   }
   addNewSlabCountryOperator() {
      this.firstStepSubmitted = true;
      if (this.parentForm.valid) {
         const formArrayLength = this.firstFormArray.length;
         const lastFormArrayValue = this.firstFormArray.value[formArrayLength - 1];
         if (lastFormArrayValue.max === 999999999) {
            this.firstStepSubmitted = false;
            this.countrySlabInput.continent_name = this.parentForm.value.continent_name;
            this.countrySlabInput.country_name = this.parentForm.value.country_name;
            this.countrySlabInput.operator_name = this.parentForm.value.operator_name;
            this.countrySlabInput.mcc = this.parentForm.value.mcc;
            this.countrySlabInput.mnc = this.parentForm.value.mnc;
            this.countrySlabInput.slabs = this.firstFormArray.value;
            const obj = JSON.parse(JSON.stringify(this.countrySlabInput));

            if (this.slabRouteService.previewList.length) {
               let countryOperatorAlreadExist = false;
               this.slabRouteService.previewList.forEach((element, index) => {
                  if (element.country_name === obj.country_name && element.operator_name === obj.operator_name) {
                     // console.log('index', index, this.editModeIndex);
                     if (index === this.editModeIndex) {
                        countryOperatorAlreadExist = false;
                     } else {
                        errorAlert('country & operator already exist', 'Warning');
                        countryOperatorAlreadExist = true;
                     }
                  }
               });
               if (!countryOperatorAlreadExist) {
                  if (this.editModeState) {
                     // console.log(obj);
                     this.slabRouteService.previewList.forEach((element, index) => {
                        if (index === this.editModeIndex) {
                           element.continent_name = obj.continent_name;
                           element.country_name = obj.country_name;
                           element.operator_name = obj.operator_name;
                           element.mcc = obj.mcc;
                           element.mnc = obj.mnc;
                           element.slabs = obj.slabs;
                        }
                     });
                     this.editModeState = false;
                     this.editModeIndex = undefined;
                     this.parentFormReset();
                     this.countriesListChildToParent.emit(obj);
                  } else {
                     this.pushDataToPreviewList(obj);
                  }
               }
            } else {
               this.pushDataToPreviewList(obj);
            }
         } else {
            errorAlert('Your last slab Max limit must be 999999999', 'Warning');
         }

      }
   }
   pushDataToPreviewList(obj) {
      this.editModeState = false;
      this.editModeIndex = undefined;
      this.slabRouteService.previewList.push(obj);
      // console.log(this.slabRouteService.previewList);
      this.countriesListChildToParent.emit(obj);
      this.parentFormReset();
   }
   parentFormReset() {
      this.operatorsList = [];
      // this.countriesList = this.continentListCopy;
      this.initCountrySubscription('');
      const form = this.parentForm;
      this.parentForm.reset({
         loggedinusername: form.value.loggedinusername,
         loggedinempid: form.value.loggedinempid,
         billplan_id: form.value.billplan_id,
         billplan_currencyid: form.value.billplan_currencyid,
         ratecard_type: form.value.ratecard_type,
         ratecard_name: form.value.ratecard_name,
         continent_name: '',
         country_name: '',
         operator_name: '',
         mcc: '',
         mnc: ''
      });
      const slabs = this.firstFormArray;
      slabs.clear();
      slabs.push(this.createSlabsItem());
   }
   // ------------------- Parent(First) Form -------------------
   // ------------------- 2nd Form --------------------------------
   initSecondForm() {
      this.secondFormGroup = this.formBuilder.group({
         // secondCtrl: ['', Validators.required]
         ratetype_row: ['standard'],
         row_custom: this.formBuilder.array([this.createSlabsItem()]),
         discount_rate: [''],
         discount_type: [''],
         description: ['']
      });
   }
   get secondFormArray(): FormArray {
      return this.slabRouteService.formArray(this.secondFormGroup, 'row_custom');
   }
   get secondFormGrpRateType() {
      return this.secondFormGroup.get('ratetype_row').value;
   }
   addToSlabsSecondFormArray() {
      this.secondStepSubmitted = true;
      const slabs = this.secondFormArray;
      if (slabs.valid) {
         this.secondStepSubmitted = false;
         const index = slabs.value.length - 1;
         const max = slabs.value[index].max;
         const min = slabs.value[index].min;
         if (min < max) {
            if (max < 999999998) {
               slabs.push(this.createSlabsItem(+max + 1, undefined));
            } else {
               errorAlert('You have reached your maximum limit', 'Warning');
            }
         } else {
            errorAlert('Max limit must be greater than Min limit', 'Warning');
         }
      }
   }
   removeFromSlabsSecondFormArray(index) {
      const slabs = this.secondFormArray;
      const max = slabs.value[index].max;
      const min = slabs.value[index].min;
      if (slabs.length > 1) {
         slabs.at(index - 1).patchValue({ max });
         slabs.removeAt(index);
      }
   }
   // initSecondFormArrayValueChangesSubscription() {
   //    const slabs = this.secondFormArray;
   //    this.sub = slabs.valueChanges
   //       .pipe(
   //          debounceTime(100),
   //          distinctUntilChanged()
   //       )
   //       .subscribe(data => {
   //          // console.log(data[this.focusedFormArrayIndex]);
   //          if (data[this.focusedFormArrayIndex] !== undefined) {
   //             slabs.at(this.focusedFormArrayIndex).get('normalize_rate').patchValue(
   //                data[this.focusedFormArrayIndex].billing_rate * this.conversionRate
   //                , { onlySelf: true }
   //             );
   //          }
   //       });
   // }
   onSecondStepSubmit() {
      this.secondStepSubmitted = true;
      if (this.secondFormGroup.value.ratetype_row === 'custom') {
         if (this.secondFormGroup.valid) {
            const formArrayLength = this.secondFormArray.length;
            const lastFormArrayValue = this.secondFormArray.value[formArrayLength - 1];
            if (lastFormArrayValue.max === 999999999) {
               this.secondStepSubmitted = false;
               this.SlabCreateRateCardInput.row_custom = this.secondFormGroup.value.row_custom;
               this.createSlabRateCard();
            } else {
               errorAlert('Your last slab Max limit must be 999999999', 'Warning');
            }
         }
      } else {
         this.SlabCreateRateCardInput.row_custom = [];
         this.secondStepSubmitted = false;
         this.createSlabRateCard();
      }
   }
   createSlabRateCard() {
      this.SlabCreateRateCardInput.loggedinusername = this.parentForm.value.loggedinusername;
      this.SlabCreateRateCardInput.loggedinempid = this.parentForm.value.loggedinempid;
      this.SlabCreateRateCardInput.billplan_id = this.parentForm.value.billplan_id;
      this.SlabCreateRateCardInput.billplan_currencyid = this.parentForm.value.billplan_currencyid;
      this.SlabCreateRateCardInput.ratecard_type = this.parentForm.value.ratecard_type;
      this.SlabCreateRateCardInput.ratecard_name = this.parentForm.value.ratecard_name;
      this.SlabCreateRateCardInput.countries = this.slabRouteService.previewList;
      this.SlabCreateRateCardInput.ratetype_row = this.secondFormGroup.value.ratetype_row;
      this.SlabCreateRateCardInput.discount_rate = this.secondFormGroup.value.discount_rate;
      this.SlabCreateRateCardInput.discount_type = this.secondFormGroup.value.discount_type;
      this.SlabCreateRateCardInput.description = this.secondFormGroup.value.description;
      // console.log(this.SlabCreateRateCardInput);
      this.slabRouteService.createSlabRateCard(this.SlabCreateRateCardInput)
         .subscribe((res: SlabCreateRateCardRes) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               successAlert(res.message, res.responsestatus);
               this.router.navigate(['billplan-management/home']);
            } else if (
               res.responsestatus === environment.APIStatus.error.text &&
               res.responsecode < environment.APIStatus.error.code
            ) {
               errorAlert(res.message, res.responsestatus);
            }
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         });
   }

   // ------------------- 2nd Form --------------------------------
}
