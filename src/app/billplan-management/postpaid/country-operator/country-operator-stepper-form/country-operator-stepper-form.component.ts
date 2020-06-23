import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import {FormBuilder, FormGroup, Validators,FormControl, FormArray} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';
import { BillPlanCountries_ApiRespone, BillPlanCountries_Data } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { MatStepper } from '@angular/material';
import Swal from 'sweetalert2';
import { OperatorsListRes } from 'src/app/route-management/models/RouteManagement/Generic/generic';

@Component({
  selector: 'app-country-operator-stepper-form',
  templateUrl: './country-operator-stepper-form.component.html',
  styleUrls: ['./country-operator-stepper-form.component.css']
})
export class CountryOperatorStepperFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  billPalnApiResponse: BillPlanCountries_ApiRespone;
  billPlanCountryList: BillPlanCountries_Data[] = [];
  isEditMode: boolean = false;
  isIndexed: number = null;
  eventGroupsListEvent: Subscription;
  operatorList=[]
  @Input() countryOperatorListEvent: Observable<[FormArray, number]>;
  @Input() parentForm: FormGroup;
  @Input() patchForm: FormGroup;
  @Output() countryOperatorList = new EventEmitter<[FormArray, number]>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  Submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,config: NgbModalConfig,
    private billPlanservice: BillManagementService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      countries: this.formBuilder.array([this.countryArrayForm()]),
    });

    this.getCountryList();
    this.eventGroupsListEvent = this.countryOperatorListEvent.subscribe(
      ([value, indexed]) => {
        console.log(value, indexed, "asdasdas");
        this.countryOperatorListData(value, indexed);
      }
    );

  }

   countryArrayForm(): FormGroup {
    return this.formBuilder.group({
      country_name: [null, Validators.required],
      operator_name:[null,Validators.required],
      billing_rate: ['',Validators.required],
      mnc:[''],
      mcc: [''],
      normalize_rate: [''],
    });
  }

  get countryControl() {
    return (this.firstFormGroup.get("countries") as FormArray).controls;
  }

  getCountryBasedOperator(country) {
    console.log(country);
    let country_Code = this.billPlanCountryList.find((c) => c.country === country)
      .country_code;
      console.log(country_Code)

    this.billPlanservice
      .getOperatorList(country_Code )
      .subscribe((data: any) => {
        console.log(data)
        this.operatorList = data.data;
      });
  }

  getCountryList() {
    this.billPlanservice.getCountriesList().subscribe(
      (res: BillPlanCountries_ApiRespone) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          console.log(res);
          this.billPalnApiResponse = res;
          this.billPlanCountryList = JSON.parse(
            JSON.stringify(this.billPalnApiResponse.data)
          );
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus, res.responsecode);
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
  getcountryControl(): FormArray {
    return <FormArray>this.firstFormGroup.controls["countries"];
  }

  handleCountryOperator(indexCountries, key, event) {
    console.log(indexCountries, key, event);
    let value = event.target.options[
      event.target["selectedIndex"]
    ].getAttribute("data-value");
    console.log(value);
    const countriesControl = this.getcountryControl();
    let obj = {};
    obj[key] = value;
    countriesControl.at(indexCountries).patchValue(obj);
  }

  addToParentForm() {
    const countryCountrol = this.getcountryControl();
    this.Submitted = true;
    if (countryCountrol.valid) {
      this.Submitted = false;
      this.countryOperatorList.emit([countryCountrol, this.isIndexed]);
      this.firstFormGroup.reset();
      this.resetForm();
      this.isEditMode = false;
      this.isIndexed = null;
    }
  }
  resetForm(){
    this.firstFormGroup = this.formBuilder.group({
      countries: this.formBuilder.array([this.countryArrayForm()]),
    });
  }

  stepperView(stepper: MatStepper, prevIndex: number, index: number) {
    if(this.firstFormGroup.untouched == true){
      stepper.next()
      return;
    }
     else if (prevIndex == 0 && index == 1) {
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
             this.resetForm()
             this.isEditMode = false
             stepper.selectedIndex = index;

          }
       })
    }
 }

  countryOperatorListData(value: FormArray, indexed: number) {
    this.isEditMode = true;
    this.isIndexed = indexed;
    const groupsControl = this.getcountryControl();
    this.getCountryBasedOperator(value['country_name'])
    groupsControl.at(0).patchValue(value);
    this.stepper.selectedIndex = 0
  }

  onCountryOpertatorFormSubmit(data){
    console.log(data)
  }
}
