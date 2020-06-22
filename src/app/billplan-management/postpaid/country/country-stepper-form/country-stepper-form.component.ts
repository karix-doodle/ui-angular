import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";
import {
  BillPlanCountries_ApiRespone,
  BillPlanCountries_Data,
} from "src/app/billplan-management/models/BillManagement/blillplan.models";
import { errorAlert } from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import * as _ from "lodash";
import { Subscription, Observable } from "rxjs";
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material';

@Component({
  selector: "app-country-stepper-form",
  templateUrl: "./country-stepper-form.component.html",
  styleUrls: ["./country-stepper-form.component.css"],
})
export class CountryStepperFormComponent implements OnInit {
  countryForm: FormGroup;
  firstFormGroup: FormGroup;
  billPalnApiResponse: BillPlanCountries_ApiRespone;
  billPlanCountryList: BillPlanCountries_Data[] = [];
  isEditMode: boolean = false;
  isIndexed: number = null;
  eventGroupsListEvent: Subscription;
  @Input() countryListEvent: Observable<[FormArray, number]>;
  @Input() parentForm: FormGroup;
  @Input() patchForm: FormGroup;
  @Output() countryList = new EventEmitter<[FormArray, number]>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  Submitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    config: NgbModalConfig,
    private billPlanservice: BillManagementService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      countries: this._formBuilder.array([this.countryArrayForm()]),
    });


    this.getCountryList();
    this.eventGroupsListEvent = this.countryListEvent.subscribe(
      ([value, indexed]) => {
        console.log(value, indexed, "asdasdas");
        this.countryListData(value, indexed);
      }
    );
  }

  get countryControl() {
    return (this.firstFormGroup.get("countries") as FormArray).controls;
  }

  getCountryList() {

    this.billPlanservice.getCountriesList().subscribe(
      (res: BillPlanCountries_ApiRespone) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
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


  countryArrayForm(): FormGroup {
    return this._formBuilder.group({
      country_name: [null, Validators.required],
      billing_rate: [null, Validators.required],
      mcc: [""],
      normalize_rate: [""],
    });
  }

  getcountryControl(): FormArray {
    return <FormArray>this.firstFormGroup.controls["countries"];
  }

  addToParentForm() {
    const countryCountrol = this.getcountryControl();
    this.Submitted = true;
    if (countryCountrol.valid) {
      this.Submitted = false;
      this.countryList.emit([countryCountrol, this.isIndexed]);
      this.firstFormGroup.reset();
      this.resetForm();
      this.isEditMode = false;
      this.isIndexed = null;
    }
  }



  resetForm(){
    this.firstFormGroup = this._formBuilder.group({
      countries: this._formBuilder.array([this.countryArrayForm()]),
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

  countryListData(value: FormArray, indexed: number) {
    this.isEditMode = true;
    this.isIndexed = indexed;
    const groupsControl = this.getcountryControl();
    groupsControl.at(0).patchValue(value);
    this.stepper.selectedIndex = 0
  }

  onCountryFormSubmit(data){
    console.log(data)
  }

}
