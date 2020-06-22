import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { count } from '../../../../shared/helper/helperFunctions'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {

  typeGroupFormGroup: FormGroup;

  row_groups = []
  countryCount = 0
  searchvalue: string = ''

  groupListData: Subject<[FormArray, number]> = new Subject<[FormArray, number]>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createGroupForm();
  }

  ngOnInit() {
  }

  private createGroupForm() {
    this.typeGroupFormGroup = this.formBuilder.group({
      billplan_id: ['12', Validators.required],
      billplan_currencyid: ['15', [Validators.required]],
      ratecard_type: ['Group', [Validators.required]],
      ratecard_name: [''],
      groups: this.formBuilder.array([this.createGroupsItem()]),
      ratetype_roc: [''],
      roc: this.formBuilder.array([this.createRocItem()]),
      ratetype_row: ['standard'],
      billing_rate_row: [''],
      discount_rate: [''],
      discount_type: ['percentage'],
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
    });
  }

  createRocItem(): FormGroup {
    return this.formBuilder.group({
      continent_name: [''],
      billing_rate: ['']
    });
  }

  groupFormArray(): FormArray {
    return <FormArray>this.typeGroupFormGroup.controls['groups'];
  }

  countriesFormArray(indexGroup: any): FormArray {
    return (<FormArray>this.typeGroupFormGroup.controls['groups']).at(indexGroup).get('countries') as FormArray;
  }

  parentGroupListData([event, index]) {
    let parentGroupArray = this.groupFormArray()
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

  editGroups(gindex: number) {
    let groupsControl = this.groupFormArray();
    this.groupListData.next([groupsControl.value[gindex], gindex]);
  }

  deleteGroups(gindex: number, cindex: number) {
    let groupsControl = this.groupFormArray();

    if (groupsControl.value[gindex]['countries'].length == 1) {
      groupsControl.value.splice(gindex, 1)
    } else {
      groupsControl.value[gindex].countries.splice(cindex, 1)
    }

    this.updateRowGroups(groupsControl.value)
  }

  updateRowGroups(value) {
    this.row_groups = JSON.parse(JSON.stringify(value));
    this.countryCount = count(this.row_groups, 'countries', 'country_name')
  }

}
