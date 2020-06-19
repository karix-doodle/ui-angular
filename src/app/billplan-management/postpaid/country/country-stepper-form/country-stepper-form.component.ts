import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-country-stepper-form",
  templateUrl: "./country-stepper-form.component.html",
  styleUrls: ["./country-stepper-form.component.css"],
})
export class CountryStepperFormComponent implements OnInit {
  countryForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  billPalnApiResponse: BillPlanCountries_ApiRespone;
  billPlanCountryList: BillPlanCountries_Data[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    config: NgbModalConfig,
    private billPlanservice: BillManagementService
  ) {}

  ngOnInit() {
    //  this.firstFormGroup = this._formBuilder.group({
    //     firstCtrl: ['', Validators.required]
    //  });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });

    this.initForm();
    this.getCountryList();
  }

  get control() {
    return this.countryForm.controls;
  }
  getCountryList() {
    this.billPlanservice.getCountryList().subscribe(
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

  initForm() {
    this.countryForm = this._formBuilder.group({
      loggedinusername: environment.loggedinempid,
      loggedinempid: environment.loggedinempid,
      billplan_id: [null],
      billplan_currencyid: [null],
      ratecard_type: ["country"],
      ratecard_name: [""],
      ratetype_row: ["custom"],
      billing_rate_row: [null],
      discount_rate: [null],
      discount_type: [""],
      description: [""],
      countries: this._formBuilder.array([this.countryArrayForm()]),
    });
  }

  onNextFrom(){

  }

  countryArrayForm(): FormGroup {
    return this._formBuilder.group({
      country_name: [null,Validators.required],
      billing_rate: [null, Validators.required],
      mcc: [""],
      normalize_rate: [],
    });
  }


  onAddCountryARRay(value) {
  const  arrayLength: number = this.billPlanCountryList.length;
  const array = this.countryForm.get("countries") as FormArray;

  if(this.countryForm.valid){
    value.forEach((el, index)=>{
      this.billPlanCountryList.forEach((element, i) => {
       if( el.country_name === element.country){
           this.billPlanCountryList[i].isSelected = true
           }

      });

     })

       // console.log(value);
       // let lastValue = _.last(value);
       // let check = value.some((country,i)=> i!==(value.length-1) && country.country_name === lastValue.country_name);
       // lastValue.isError = check;
       // console.log(value,check ,lastValue);


     if(arrayLength > value.length ){
       array.push(
         this._formBuilder.group({
           country_name: [null, Validators.required],
           billing_rate: [null,Validators.required],
           mcc: [""],
           normalize_rate: [],
         })
       );
     }

  }


  }

  onDeleteCountryArray(index: number, value) {
    console.log(index, value);

    this.billPlanCountryList.forEach((el, i) => {
      if(el.country === value.country_name){
        this.billPlanCountryList[i].isSelected = false
      }
    })
    // value.forEach((el, index)=>{
    //   this.billPlanCountryList.forEach((element, i) => {
    //    if( el.country_name === element.country){
    //        this.billPlanCountryList[i].isSelected = true
    //        }

    //        console.log(this.billPlanCountryList[i].isSelected)
    //   });

    //  })
    const array = this.countryForm.get("countries") as FormArray;
    if (array.length !== 1) {
      (<FormArray>this.countryForm.get("countries")).removeAt(index);
    }
  }

  get countryControl() {
    return (this.countryForm.get("countries") as FormArray).controls;
  }
}



// if( el.country === value[value.length].country_name){
//   this.billPlanCountryList[index].isSelected = true
//   } else{
//    this.billPlanCountryList[index].isSelected = false
//   }
