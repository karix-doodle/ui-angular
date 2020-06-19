import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { count } from '../../../../shared/helper/helperFunctions'

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
      ratetype_row: [''],
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

  groupListData(event: FormArray) {
    let parentGroupArray = this.groupFormArray()
    if (parentGroupArray.value.length == 1 && parentGroupArray.value[0].group_name == "") {
      parentGroupArray.value[0] = event.value[0];
    } else {
      parentGroupArray.value.push(event.value[0]);
    }
    this.row_groups = JSON.parse(JSON.stringify(parentGroupArray.value));
    this.countryCount = count(this.row_groups, 'countries', 'country_name')
  }

}
