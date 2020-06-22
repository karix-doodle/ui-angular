import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { startWith, pairwise, debounceTime } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { MatStepper } from '@angular/material';
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";
import {
   BillPlanCountries_ApiRespone,
   BillPlanCountries_Data,
   BillPlanContinent_ApiRespone,
   BillPlanOperator_ApiRespone,
   BillPlanOperator_Data
} from "src/app/billplan-management/models/BillManagement/blillplan.models";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { count } from '../../../../shared/helper/helperFunctions'

import Swal from 'sweetalert2';
import { errorAlert } from "src/app/shared/sweet-alert/sweet-alert";

@Component({
   selector: 'app-group-stepper-form',
   templateUrl: './group-stepper-form.component.html',
   styleUrls: ['./group-stepper-form.component.css']
})

export class GroupStepperFormComponent implements OnInit {

   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;

   billPalnContinentApiResponse: BillPlanContinent_ApiRespone;
   billPlanContinentList = [];

   billPalnCountriesApiResponse: BillPlanCountries_ApiRespone;
   billPlanCountryList: BillPlanCountries_Data[] = [];

   billPalnOperatorApiResponse: BillPlanOperator_ApiRespone;
   billPlanOperator: BillPlanOperator_Data[] = [];

   @Input() parentForm: FormGroup;
   @Input() rowGroups: [];
   @Output() parentGroupsList = new EventEmitter<[FormArray, number]>();
   @ViewChild('stepper', { static: false }) stepper: MatStepper;

   private eventGroupsListEvent: Subscription;
   @Input() groupsListEvent: Observable<[FormArray, number]>;

   isEditMode: boolean = false
   isIndexed: number = null
   groupSubmitted: boolean = false
   isContinentCanceled: string = null

   constructor(
      private formBuilder: FormBuilder,
      private billPlanservice: BillManagementService,
   ) { }

   ngOnInit() {
      this.firstFormGroup = this.formBuilder.group({
         //Xs = group
         groups: this.formBuilder.array([this.createGroupsItem()]), //init x
      });
      this.secondFormGroup = this.formBuilder.group({
         ratetype_roc: ['custom', Validators.required],
         roc: this.formBuilder.array([this.createRocItem()]),
      });

      this.eventGroupsListEvent = this.groupsListEvent.subscribe(([value, indexed]) => {
         this.groupListData(value, indexed);
      });

      this.getContinentList();
      this.getCountryList('');
      this.handleContinentChange();

   }

   handleContinentChange() {
      const groupsControl = this.groupFormArray();
      groupsControl.at(0).get('continent_name')
         .valueChanges.pipe(
            debounceTime(10),
            startWith(null),
            pairwise()
         ).subscribe(([prev, next]: [string, string]) => {
            if (this.isContinentCanceled == null) {
               Swal.fire({
                  title: 'Are you sure want to change continent?',
                  text: "If yes, entered data will get cleared",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes'
               }).then((result) => {
                  if (result.value) {
                     this.getCountryList(next);
                     this.isContinentCanceled = null
                  } else {
                     this.isContinentCanceled = next
                     groupsControl.at(0).get('continent_name').setValue(prev ? prev : '')
                  }
               })
            } else {
               this.isContinentCanceled = null
            }
         });
   }

   getContinentList() {
      this.billPlanservice.getContinentList().subscribe(
         (res: BillPlanContinent_ApiRespone) => {
            this.billPalnContinentApiResponse = res;
            this.billPlanContinentList = JSON.parse(
               JSON.stringify(this.billPalnContinentApiResponse)
            );
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         }
      );
   }

   getCountryList(value) {
      let data = {
         continent: value
      }
      this.billPlanservice.getCountryList(data).subscribe(
         (res: BillPlanCountries_ApiRespone) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.billPalnCountriesApiResponse = res;
               this.billPlanCountryList = JSON.parse(
                  JSON.stringify(this.billPalnCountriesApiResponse.data)
               );
            } else if (
               res.responsestatus === environment.APIStatus.error.text &&
               res.responsecode < environment.APIStatus.error.code
            ) {
               errorAlert(res.responsestatus, res.responsecode);
            }
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         }
      );
   }

   getOperatorList(value) {
      let data = {
         country: value
      }
      this.billPlanservice.getOperatorList(data).subscribe(
         (res: BillPlanCountries_ApiRespone) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.billPalnOperatorApiResponse = res;
               this.billPlanOperator = JSON.parse(
                  JSON.stringify(this.billPalnOperatorApiResponse.data)
               );
            } else if (
               res.responsestatus === environment.APIStatus.error.text &&
               res.responsecode < environment.APIStatus.error.code
            ) {
               errorAlert(res.responsestatus, res.responsecode);
            }
         }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
         }
      );
   }

   ngOnDestroy() {
      this.eventGroupsListEvent.unsubscribe();
   }

   createGroupsItem(): FormGroup { // init = x
      return this.formBuilder.group({
         group_name: ['', [Validators.required]],
         continent_name: [''],
         //Ys = countries
         countries: this.formBuilder.array([this.createGroupCountriesItem()]) //init y
      });
   }

   createGroupCountriesItem(): FormGroup { // init = y
      return this.formBuilder.group({
         // y1, y2, y3, y4
         continent_name: [''],
         country_name: ['', [Validators.required]],
         operator_name: ['', [Validators.required]],
         mcc: ['', [Validators.required]],
         mnc: ['', [Validators.required]],
         billing_rate: ['', [Validators.required]],
         normalize_rate: [''],
      });
   }

   createRocItem(): FormGroup {
      return this.formBuilder.group({
         continent_name: [''],
         routedCountries: [''],
         groupName: [''],
         billing_rate: ['']
      });
   }

   groupFormArray(): FormArray {
      return <FormArray>this.firstFormGroup.controls['groups'];
   }

   rocFormArray(): FormArray {
      return <FormArray>this.secondFormGroup.controls['roc'];
   }

   countriesFormArray(indexGroup: any): FormArray {
      return (<FormArray>this.firstFormGroup.controls['groups']).at(indexGroup).get('countries') as FormArray;
   }

   handleCountryOperator(indexGroup, indexCountries, key, event) {
      let value = event.target.options[event.target["selectedIndex"]].getAttribute("data-value")
      const countriesControl = this.countriesFormArray(indexGroup);
      let obj = {}
      obj[key] = value
      countriesControl.at(indexCountries).patchValue(obj)
      if (key == 'mcc') {
         let continentValue = event.target.options[event.target["selectedIndex"]].getAttribute("data-continent")
         countriesControl.at(indexCountries).patchValue({
            continent_name: continentValue
         })
         this.getOperatorList(event.target.value);
      }
   }

   addToGroups(): void {
      const groupsControl = this.groupFormArray();
      groupsControl.push(this.createGroupsItem());
   }

   addToROC(): void {
      const rocControl = this.rocFormArray();
      rocControl.push(this.createRocItem());
   }

   addToCountries(indexGroup, editMode = false) {
      const countriesControl = this.countriesFormArray(indexGroup);
      this.groupSubmitted = true
      if (countriesControl.valid || editMode) {
         this.groupSubmitted = false
         countriesControl.push(this.createGroupCountriesItem());
      }
   }

   removeFromCountries(indexGroup, indexCountries) {
      const countriesControl = this.countriesFormArray(indexGroup);
      countriesControl.removeAt(indexCountries)
   }

   addNewGroup() {
      const groupsControl = this.groupFormArray();
      this.groupSubmitted = true
      if (groupsControl.valid) {
         this.groupSubmitted = false
         this.parentGroupsList.emit([groupsControl, this.isIndexed]);
         this.resetFirstFormGroup();
         this.isEditMode = false
         this.isIndexed = null
      }
   }

   groupListData(value: FormArray, indexed: number) {
      this.isEditMode = true
      this.isIndexed = indexed
      const groupsControl = this.groupFormArray();
      [...Array(value['countries'].length - 1)].map(() =>
         this.addToCountries(0, true)
      )
      this.isContinentCanceled = ''
      groupsControl.at(0).patchValue(value)
      this.stepper.selectedIndex = 0
   }

   resetFirstFormGroup() {
      this.firstFormGroup = this.formBuilder.group({
         groups: this.formBuilder.array([this.createGroupsItem()]),
      });
      this.handleContinentChange()
   }

   stepperView(stepper: MatStepper, prevIndex: number, index: number) {
      if (prevIndex == 0 && index == 1) {
         Swal.fire({
            title: 'Are you sure want to Proceed Next?',
            text: "Your unsaved data will get erassed",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
         }).then((result) => {
            if (result.value) {
               this.resetFirstFormGroup()
               stepper.selectedIndex = index;
               this.populateROC()
            }
         })
      }
   }

   populateROC() {
      let continentCount = count(this.rowGroups, 'countries', 'continent_name');
      [...Array(continentCount - 1)].map(() =>
         this.addToROC()
      )
   }

   onSubmitGroupsData(data) {
      console.log(data, 'asdasdsad')
   }

}
