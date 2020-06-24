import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, pairwise, debounceTime } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { MatStepper } from '@angular/material';
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";
import { GroupRouteService } from "src/app/billplan-management/services/BillManagement/Group/group-route.service";
import {
   BillPlanCountries_ApiRespone,
   BillPlanCountries_Data,
   BillPlanContinent_ApiRespone,
   BillPlanOperator_ApiRespone,
   BillPlanOperator_Data,
   BillPlanCreateGroup_ApiResponse
} from "src/app/billplan-management/models/BillManagement/blillplan.models";

import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

import Swal from 'sweetalert2';
import { errorAlert, successAlert } from "src/app/shared/sweet-alert/sweet-alert";

@Component({
   selector: 'app-group-stepper-form',
   templateUrl: './group-stepper-form.component.html',
   styleUrls: ['./group-stepper-form.component.css']
})

export class GroupStepperFormComponent implements OnInit {

   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;

   billPalnContinentApiResponse: string[];
   billPlanContinentList = [];

   billPalnCountriesApiResponse: BillPlanCountries_ApiRespone;
   billPlanCountryList: BillPlanCountries_Data[] = [];

   billPalnOperatorApiResponse: BillPlanOperator_ApiRespone;
   billPlanOperator: BillPlanOperator_Data[] = [];

   @Input() parentForm: FormGroup;
   @Input() rowGroups: [];
   @Output() parentGroupsList = new EventEmitter<[FormArray, number]>();
   @Output() parentRocData = new EventEmitter<[any]>();
   @ViewChild('stepper', { static: false }) stepper: MatStepper;

   operatorObj: object = {}

   private eventGroupsListEvent: Subscription;
   @Input() groupsListEvent: Observable<[FormArray, number]>;

   private eventHandleGroupsDelete: Subscription;
   @Input() handleGroupsDelete: Observable<[string, number]>;

   isEditMode: boolean = false
   isIndexed: number = null
   groupSubmitted: boolean = false
   isContinentCanceled: string = null
   disableWrapper: boolean = false

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private billPlanservice: BillManagementService,
      private billPlanGroupservice: GroupRouteService,
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

      this.eventHandleGroupsDelete = this.handleGroupsDelete.subscribe(([value, indexed]) => {
         this.handleGroupsListDelete(value, indexed);
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
                     this.functionActiveOperator(() => {
                        this.resetCountriesGroup()
                        this.getCountryList(next);
                        this.isContinentCanceled = null;
                        this.disableWrapper = false
                     });
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

   functionActiveOperator(callBackFunction) {
      this.reActiveOperator();
      this.disableWrapper = true;
      callBackFunction();
   }

   reActiveOperator() {
      const countriesControl = this.countriesFormArray(0);
      countriesControl.value.forEach((items, index) => {
         if (items.country_name != '') {
            this.operatorObj[items.country_name].filter((item) => {
               if (item.mnc == items.mnc) {
                  item.isSelected = false
               }
            })
         }
      })
   }

   getContinentList() {
      this.billPlanservice.getContinentList().subscribe(
         (res: string[]) => {
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

   round(data) {
      return data * 0.0003
   }

   getOperatorList(value, name) {
      let data = {
         country_code: value
      }
      let countryOptData = Object.keys(this.operatorObj)
      if (!countryOptData.includes(name)) {
         this.billPlanservice.getOperatorList(data).subscribe(
            (res: BillPlanOperator_ApiRespone) => {
               if (
                  res.responsestatus === environment.APIStatus.success.text &&
                  res.responsecode > environment.APIStatus.success.code
               ) {
                  this.billPalnOperatorApiResponse = res;
                  const modifiedData = this.billPalnOperatorApiResponse.data.map(rawProduct => {
                     return { ...rawProduct, isSelected: false }; // added IsSelected key for dropdown.
                  });
                  this.billPalnOperatorApiResponse.data = modifiedData;
                  this.billPlanOperator = JSON.parse(
                     JSON.stringify(this.billPalnOperatorApiResponse.data)
                  );
                  this.operatorObj[name] = []
                  this.operatorObj[name] = this.billPlanOperator
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
      console.log(this.operatorObj, 'asdasd')
   }

   ngOnDestroy() {
      this.eventGroupsListEvent.unsubscribe();
      this.eventHandleGroupsDelete.unsubscribe();
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
         billing_rate: ['', [Validators.required, Validators.pattern('[0-9.]{6,6}')]],
         normalize_rate: [''],
      });
   }

   createRocItem(): FormGroup {
      return this.formBuilder.group({
         continent_name: [''],
         groupName: [''],
         routedCountries: [''],
         billing_rate: ['']
      });
   }

   groupFormArray(): FormArray {
      return <FormArray>this.firstFormGroup.controls['groups'];
   }

   countriesFormArray(indexGroup: any): FormArray {
      return (<FormArray>this.firstFormGroup.controls['groups']).at(indexGroup).get('countries') as FormArray;
   }

   rocFormArray(): FormArray {
      return <FormArray>this.secondFormGroup.controls['roc'];
   }

   handleCountryOperator(indexGroup, indexCountries, key, event, country) {
      let value = event.target.options[event.target["selectedIndex"]].getAttribute("data-value")
      const countriesControl = this.countriesFormArray(indexGroup);

      if (key == 'mcc') {
         if (countriesControl.value[indexCountries].mnc != '') {
            let itemCountry = this.billPlanCountryList.filter((item) => {
               if (item.mcc == countriesControl.value[indexCountries].mcc) {
                  return item.country
               }
            })
            this.operatorObj[itemCountry[0]['country']].filter((item) => {
               if (item.mnc == countriesControl.value[indexCountries].mnc) {
                  item.isSelected = false
               }
            })
         }
      }

      if (key == 'mnc') {
         if (countriesControl.value[indexCountries].mnc != "") {
            this.operatorObj[country].filter((item) => {
               if (item.mnc == countriesControl.value[indexCountries].mnc) {
                  item.isSelected = false
               }
            })
         }
      }

      let obj = {}
      obj[key] = value != null ? value : '';
      countriesControl.at(indexCountries).patchValue(obj)
      if (key == 'mcc') {
         let continentValue = event.target.options[event.target["selectedIndex"]].getAttribute("data-continent")
         let countryCode = event.target.options[event.target["selectedIndex"]].getAttribute("data-code")
         countriesControl.at(indexCountries).patchValue({
            continent_name: continentValue != null ? continentValue : '',
            operator_name: '',
            mnc: '',
         })
         this.getOperatorList(countryCode, event.target.value);
      } else if (key == 'mnc') {
         if (country != '') {
            this.operatorObj[country].filter((item) => {
               if (item.mnc == value) {
                  item.isSelected = true
               }
            })
         }
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
      let country = countriesControl.value[indexCountries].country_name
      let mnc = countriesControl.value[indexCountries].mnc
      if (country != '' && mnc != '') {
         this.operatorObj[country].filter((item) => {
            if (item.mnc == mnc) {
               item.isSelected = false
            }
         })
      }
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

   updateRoc(stepper: MatStepper) {
      this.parentRocData.emit([this.secondFormGroup.value]);
      stepper.next()
   }

   groupListData(value: FormArray, indexed: number) {
      const groupsControl = this.groupFormArray();
      groupsControl.markAsUntouched();
      this.isEditMode = true;
      this.isIndexed = indexed;
      [...Array(value['countries'].length - 1)].map(() =>
         this.addToCountries(0, true)
      )
      this.isContinentCanceled = '';
      this.getCountryList(value['continent_name']);
      groupsControl.at(0).patchValue(value)
      this.stepper.selectedIndex = 0
   }

   handleGroupsListDelete(value, indexed) {
      this.operatorObj[value].filter((item) => {
         if (item.mnc == indexed) {
            item.isSelected = false
         }
      })
   }

   resetFirstFormGroup() {
      this.firstFormGroup = this.formBuilder.group({
         groups: this.formBuilder.array([this.createGroupsItem()]),
      });
      this.handleContinentChange()
      this.getCountryList('');
   }

   resetCountriesGroup() {
      const countriesControl = this.countriesFormArray(0);
      let countriesLength = countriesControl.value.length;
      for (let i = countriesLength; i > 0; i--) {
         countriesControl.removeAt(i - 1)
      }
      countriesControl.push(this.createGroupCountriesItem());
   }

   stepperView(stepper: MatStepper, prevIndex: number, index: number) {
      if (this.firstFormGroup.untouched == true) {
         this.resetFirstFormGroup();
         this.isEditMode = false;
         stepper.selectedIndex = index;
         this.parentGroupsList.emit([null, null]);
         this.isIndexed = null
         this.populateROC();
         return;
      }
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
               this.functionActiveOperator(() => {
                  this.resetFirstFormGroup();
                  this.isEditMode = false;
                  stepper.selectedIndex = index;
                  this.populateROC();
                  this.disableWrapper = false
                  this.isIndexed = null
               });
            }
         })
      }
   }

   populateROC() {

      this.secondFormGroup = this.formBuilder.group({
         ratetype_roc: ['custom', Validators.required],
         roc: this.formBuilder.array([this.createRocItem()]),
      });

      let continentList = []
      this.rowGroups.forEach((element) => {
         let elements: any = element
         elements['countries'].forEach(elementsub => {
            continentList.push(elementsub['continent_name'])
         });
      });

      const continentListFinal = [...new Set(continentList)];
      let continentObj = {}
      continentListFinal.forEach((citem) => {
         continentObj[citem] = []
         this.rowGroups.forEach((item, index) => {
            let grpName = item['group_name']
            let countriesArray: any = item['countries'];
            countriesArray.forEach((coitem) => {
               if (coitem['continent_name'] == citem) {
                  let obj = {}
                  obj['groupName'] = grpName
                  obj['countries'] = coitem['country_name']
                  continentObj[citem].push(obj)
               }
            })
         })
      })

      let continentStructure = []
      Object.entries(continentObj).map(([key, value]) => {
         let obj = {}
         obj['continent_name'] = key
         obj['groupName'] = []
         obj['routedCountries'] = []
         obj['billing_rate'] = ''
         let values: any = value
         values.forEach((item) => {
            obj['groupName'].push(item['groupName']);
            obj['routedCountries'].push(item['countries']);
         });
         continentStructure.push(obj)
      })

      continentStructure.forEach((item) => {
         item.groupName = [...new Set(item['groupName'])].toString();
         item.routedCountries = [...new Set(item['routedCountries'])].length;
      });

      [...Array(continentStructure.length - 1)].map(() => {
         this.addToROC()
      });

      const rocControl = this.rocFormArray();
      rocControl.patchValue(continentStructure)

   }

   onSubmitGroupsData(data) {

      data.groups.forEach((item) => {
         delete item.continent_name
      })
      data.roc.forEach((item) => {
         delete item.routedCountries
         delete item.groupName
      })
      data.billing_rate_row = data.ratetype_row == 'standard' ? '' : data.billing_rate_row;

      this.billPlanGroupservice.BillPlanCreateGroup(data).subscribe(
         (res: BillPlanCreateGroup_ApiResponse) => {
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
