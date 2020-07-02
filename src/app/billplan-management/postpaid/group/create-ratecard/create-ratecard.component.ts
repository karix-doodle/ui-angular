import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";
import { count } from '../../../../shared/helper/helperFunctions'
import { Subject } from 'rxjs';

import {
  BillPlanCurrency_ApiResponse,
  BillPlanCurrency_Data,
} from '../../../models/BillManagement/blillplan.models';

import { successAlert, errorAlert, infoAlert } from 'src/app/shared/sweet-alert/sweet-alert';

import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})

export class CreateRatecardComponent implements OnInit {

  typeGroupFormGroup: FormGroup;

  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;

  currencySybmol: object = {
    bCurrency: '',
    nCurrency: ''
  }
  row_groups = []
  countryCount = 0
  searchvalue: string = ''
  isEditMode: boolean = false
  ratecard_name: string

  groupListData: Subject<[FormArray, number]> = new Subject<[FormArray, number]>();
  handleGroupsDelete: Subject<[string, number]> = new Subject<[string, number]>();
  handlecurrencyList: Subject<[object]> = new Subject<[object]>();

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private billPlanservice: BillManagementService,
  ) {
    this.createGroupForm();
    this.ratecard_name = this.activeRoute.snapshot.params.name
  }

  ngOnInit() {
    this.getBillPlanCurrency();
  }

  getBillPlanCurrency() {
    this.billPlanservice.BillPlancurrency().subscribe(
      (res: BillPlanCurrency_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          console.log(res);
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

          this.handlecurrencyList.next([this.currencySybmol]);

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

  private createGroupForm() {
    this.typeGroupFormGroup = this.formBuilder.group({
      billplan_id: [this.activeRoute.snapshot.params.bId, Validators.required],
      billplan_currencyid: [this.activeRoute.snapshot.params.cId, [Validators.required]],
      ratecard_type: ['Group', [Validators.required]],
      ratecard_name: [this.activeRoute.snapshot.params.name, Validators.required],
      groups: this.formBuilder.array([this.createGroupsItem()]),
      ratetype_roc: ['standard'],
      roc: this.formBuilder.array([this.createRocItem()]),
      ratetype_row: ['standard'],
      billing_rate_row: [''],
      discount_rate: [''],
      discount_type: [''],
      description: ['']
    });
  }

  createGroupsItem(): FormGroup {
    return this.formBuilder.group({
      group_name: [''],
      continent_name: [''],
      countries: this.formBuilder.array([this.createGroupCountriesItem()])
    });
  }

  createGroupCountriesItem(): FormGroup {
    return this.formBuilder.group({
      continent_name: [''],
      country_name: [''],
      operator_name: [''],
      mcc: [''],
      mnc: [''],
      billing_rate: [''],
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
    return <FormArray>this.typeGroupFormGroup.controls['groups'];
  }

  countriesFormArray(indexGroup: any): FormArray {
    return (<FormArray>this.typeGroupFormGroup.controls['groups']).at(indexGroup).get('countries') as FormArray;
  }

  rocFormArray(): FormArray {
    return <FormArray>this.typeGroupFormGroup.controls['roc'];
  }

  addToROC(): void {
    const rocControl = this.rocFormArray();
    rocControl.push(this.createRocItem());
  }

  parentGroupListData([event, index]) {
    let parentGroupArray = this.groupFormArray()
    if (event != null) {
      if (index == null) {
        if (parentGroupArray.value.length == 1 && parentGroupArray.value[0].group_name == "") {
          parentGroupArray.value[0] = event.value[0];
        } else {
          parentGroupArray.value.push(event.value[0]);
        }
      } else {
        parentGroupArray.value[index] = event.value[0];
      }
      this.updateRowGroups(parentGroupArray.value)
    }
    this.isEditMode = false
  }

  parentRocData([event]) {
    let parentRocArray = this.rocFormArray();
    let parentRocLength = parentRocArray.value.length;
    for (let i = parentRocLength; i > 0; i--) {
      parentRocArray.removeAt(i - 1)
    }
    [...Array(event.roc.length)].map(() => {
      this.addToROC();
    });
    parentRocArray.patchValue(event.roc)
    this.typeGroupFormGroup.patchValue({
      ratetype_roc: event.ratetype_roc
    })
  }

  editGroups(gindex: number) {
    if (this.isEditMode == false) {
      let groupsControl = this.groupFormArray();
      this.groupListData.next([groupsControl.value[gindex], gindex]);
      this.isEditMode = true
    }
  }

  deleteGroups(gindex: number, cindex: number, item: any) {
    let groupsControl = this.groupFormArray();

    if (this.isEditMode == false) {

      this.handleGroupsDelete.next([item.country_name, item.mnc]);

      if (groupsControl.value[gindex]['countries'].length == 1) {
        groupsControl.value.splice(gindex, 1)
      } else {
        groupsControl.value[gindex].countries.splice(cindex, 1)
      }

      this.updateRowGroups(groupsControl.value)
    }

  }

  updateRowGroups(value) {
    this.row_groups = JSON.parse(JSON.stringify(value));
    this.countryCount = count(this.row_groups, 'countries', 'country_name')
  }

}
