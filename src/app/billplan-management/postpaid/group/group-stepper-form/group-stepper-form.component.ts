import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
   selector: 'app-group-stepper-form',
   templateUrl: './group-stepper-form.component.html',
   styleUrls: ['./group-stepper-form.component.css']
})

export class GroupStepperFormComponent implements OnInit {

   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   thirdFormGroup: FormGroup;

   @Input() parentForm: FormGroup;

   @Output() groupsList = new EventEmitter();

   groupSubmitted: boolean = false

   constructor(
      private formBuilder: FormBuilder,
      config: NgbModalConfig) { }

   ngOnInit() {
      this.firstFormGroup = this.formBuilder.group({
         //Xs = group
         groups: this.formBuilder.array([this.createGroupsItem()]), //init x
      });
      this.secondFormGroup = this.formBuilder.group({
         secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this.formBuilder.group({
         secondCtrl: ['', Validators.required]
      });
   }

   createGroupsItem(): FormGroup { // init = x
      return this.formBuilder.group({
         group_name: new FormControl('', [Validators.required]),
         continent_name: new FormControl(''),
         //Ys = countries
         countries: this.formBuilder.array([this.createGroupCountriesItem()]) //init y
      });
   }

   createGroupCountriesItem(): FormGroup { // init = y
      return this.formBuilder.group({
         // y1, y2, y3, y4
         continent_name: new FormControl(''),
         country_name: ['', [Validators.required]],
         operator_name: ['', [Validators.required]],
         mcc: ['', [Validators.required]],
         mnc: ['', [Validators.required]],
         billing_rate: ['', [Validators.required]],
         normalize_rate: [''],
      });
   }

   groupFormArray(): FormArray {
      return <FormArray>this.firstFormGroup.controls['groups'];
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
   }

   addToGroups(): void {
      const groupsControl = this.groupFormArray();
      groupsControl.push(this.createGroupsItem());
   }

   addToCountries(indexGroup) {
      const countriesControl = this.countriesFormArray(indexGroup);
      this.groupSubmitted = true
      if (countriesControl.valid) {
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
         this.groupsList.emit(groupsControl);
         this.firstFormGroup.reset();
         this.firstFormGroup = this.formBuilder.group({
            groups: this.formBuilder.array([this.createGroupsItem()]),
         });
      }
   }


}
