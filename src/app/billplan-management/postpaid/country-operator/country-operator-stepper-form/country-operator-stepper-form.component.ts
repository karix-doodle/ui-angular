import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";
import {
  BillPlanCountries_ApiRespone,
  BillPlanCountries_Data,
  BillPlanOperator_ApiRespone,
  BillPlanOperator_Data,
  BillPlanCreateCountryOperator_ApiResponse,
  CurrencyRateRes,
} from "src/app/billplan-management/models/BillManagement/blillplan.models";
import { environment } from "src/environments/environment";
import { errorAlert, successAlert } from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { MatStepper } from "@angular/material";
import Swal from "sweetalert2";
import { OperatorsListRes } from "src/app/route-management/models/RouteManagement/Generic/generic";
import { BillplanCountryOperatorService } from 'src/app/billplan-management/services/BillManagement/billplan-country-operator/billplan-country-operator.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: "app-country-operator-stepper-form",
  templateUrl: "./country-operator-stepper-form.component.html",
  styleUrls: ["./country-operator-stepper-form.component.css"],
})
export class CountryOperatorStepperFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  billPalnApiResponse: BillPlanCountries_ApiRespone;
  billPlanCountryList: BillPlanCountries_Data[] = [];
  isEditMode: boolean = false;
  isIndexed: number = null;
  eventGroupsListEvent: Subscription;
  billPalnOperatorApiResponse: BillPlanOperator_ApiRespone;
  billPlanOperator: BillPlanOperator_Data[] = [];
  @Input() countryOperatorListEvent: Observable<[FormArray, number]>;
  @Input() parentForm: FormGroup;
  @Input() patchForm: FormGroup;
  @Output() countryOperatorList = new EventEmitter<[FormArray, number]>();
  @ViewChild("stepper", { static: false }) stepper: MatStepper;
  private eventHandleCountryDelete: Subscription;
  @Input() handleCountryDelete: Observable<[string, number]>;
  private eventCurrencyList: Subscription;
  @Input() handlecurrencyList: Observable<[object]>;
  Submitted: boolean = false;
  operatorObj: object = {};
  currencySybmol: object = {
    bCurrency: '',
    nCurrency: ''
 }
 Psubmitted: boolean = false
  conversionRate:number;
  constructor(
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private billPlanservice: BillManagementService,
    private billpancountryOptorService: BillplanCountryOperatorService,
    private router: Router
  ) {}

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
    this.eventHandleCountryDelete = this.handleCountryDelete.subscribe(
      ([value, indexed]) => {
        this.handleCountryListDelete(value, indexed);
      }
    );
    this.eventCurrencyList = this.handlecurrencyList.subscribe(([value]) => {
      this.handleCurrencyData(value);
   });
    this.initCurrencyConversion();
  }

  handleCurrencyData(value) {
    this.currencySybmol = value
    console.log(value, 'asdasd')
 }

  countryArrayForm(): FormGroup {
    return this.formBuilder.group({
      country_name: ["", Validators.required],
      operator_name: ["", Validators.required],
      billing_rate: ['', [Validators.required, Validators.pattern('^([0-9]+(\.[0-9]+)?)')]],
      mnc: [""],
      mcc: [""],
      normalize_rate: [""],
    });
  }

  get countryControl() {
    return (this.firstFormGroup.get("countries") as FormArray).controls;
  }

  handleCountryListDelete(value, indexed) {
    this.operatorObj[value].filter((item) => {
      if (item.mnc == indexed) {
        item.isSelected = false;
      }
    });
  }
  getOperatorList(value, name) {
    console.log(value, "12345");
    let data = {
      country_code: value,
    };
    let countryOptData = Object.keys(this.operatorObj);
    if (!countryOptData.includes(name)) {
      this.billPlanservice.getOperatorList(data).subscribe(
        (res: BillPlanOperator_ApiRespone) => {
          console.log(res);
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            this.billPalnOperatorApiResponse = res;
            const modifiedData = this.billPalnOperatorApiResponse.data.map(
              (rawProduct) => {
                return { ...rawProduct, isSelected: false }; // added IsSelected key for dropdown.
              }
            );
            this.billPalnOperatorApiResponse.data = modifiedData;
            this.billPlanOperator = JSON.parse(
              JSON.stringify(this.billPalnOperatorApiResponse.data)
            );
            this.operatorObj[name] = [];
            this.operatorObj[name] = this.billPlanOperator;
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
    console.log(this.operatorObj, "asdasd");
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

  handleCountryOperator(indexCountries, key, event, country) {
    console.log(indexCountries, key, event);
    let value = event.target.options[
      event.target["selectedIndex"]
    ].getAttribute("data-value");
    console.log(value);
    const countriesControl = this.getcountryControl();
    if (key == "mcc") {
      if (countriesControl.value[indexCountries].mnc != "") {
        let itemCountry = this.billPlanCountryList.filter((item) => {
          if (item.mcc == countriesControl.value[indexCountries].mcc) {
            return item.country;
          }
        });
        this.operatorObj[itemCountry[0]["country"]].filter((item) => {
          if (item.mnc == countriesControl.value[indexCountries].mnc) {
            item.isSelected = false;
          }
        });
      }
    }

    if (key == "mnc") {
      if (countriesControl.value[indexCountries].mnc != "") {
        this.operatorObj[country].filter((item) => {
          if (item.mnc == countriesControl.value[indexCountries].mnc) {
            item.isSelected = false;
          }
        });
      }
    }
    let obj = {};
    obj[key] = value != null ? value : "";
    countriesControl.at(indexCountries).patchValue(obj);
    if (key == "mcc") {
      let countryCode = event.target.options[
        event.target["selectedIndex"]
      ].getAttribute("data-code");
      countriesControl.at(indexCountries).patchValue({
        operator_name: "",
        mnc: "",
      });
      this.getOperatorList(countryCode, event.target.value);
    } else if (key == "mnc") {
      if (country != "") {
        this.operatorObj[country].filter((item) => {
          if (item.mnc == value) {
            item.isSelected = true;
          }
        });
      }
    }
  }

  handleDiscountType() {
    if (this.parentForm.value.discount_type == 'percentage') {
       this.parentForm.get('discount_rate').setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
       this.parentForm.get('discount_rate').updateValueAndValidity();
    } else if (this.parentForm.value.discount_type == 'unit') {
       this.parentForm.get('discount_rate').setValidators([Validators.required, Validators.pattern('^([0-9]+(\.[0-9]+)?)')]);
       this.parentForm.get('discount_rate').updateValueAndValidity();
    } else {
       this.parentForm.patchValue({
          discount_rate: ''
       })
       this.parentForm.get('discount_rate').clearValidators();
       this.parentForm.get('discount_rate').updateValueAndValidity();
    }
  }

  addToParentForm() {
    const countryCountrol = this.getcountryControl();
    this.Submitted = true;
    if (countryCountrol.valid) {
      this.Submitted = false;
      this.countryOperatorList.emit([countryCountrol, this.isIndexed]);
      this.resetForm();
      this.isEditMode = false;
      this.isIndexed = null;
    }
  }
  resetForm() {
    this.firstFormGroup = this.formBuilder.group({
      countries: this.formBuilder.array([this.countryArrayForm()]),
    });
  }

  stepperView(stepper: MatStepper, prevIndex: number, index: number) {
    if (this.firstFormGroup.untouched == true) {
      this.isIndexed = null;
      this.resetForm();
      this.isEditMode = false;
      this.countryOperatorList.emit([null, null]);
      stepper.selectedIndex = index;
      this.Submitted = false;
      this.isIndexed = null;
      return;
    }
    if (prevIndex == 0 && index == 1) {
      Swal.fire({
        title: "Are you sure want to Proceed Next?",
        text: "Your unsaved data will get erassed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          this.isIndexed = null;
          this.functionActiveOperator(() => {
            this.resetForm();
            this.isEditMode = false;
            stepper.selectedIndex = index;
            this.firstFormGroup.markAsUntouched;
            this.Submitted = false;
          });
        }
      });
    }
  }

  functionActiveOperator(callBackFunction) {
    this.reActiveOperator();

    callBackFunction();
  }

  round(data, form: FormGroup) {
    let NormalizedRate = (data * this.conversionRate).toFixed(6)
    if (form != undefined) {
       form.patchValue({
          normalize_rate: NormalizedRate
       })
    }
    return NormalizedRate
 }
 // ------------------- common ----------------------------------

 // ------------------- Parent(First) Form -------------------
 initCurrencyConversion() {
    this.billPlanservice.getCurrencyRate(this.parentForm.value.billplan_currencyid).subscribe(
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

  reActiveOperator() {
    const countriesControl = this.getcountryControl();
    countriesControl.value.forEach((items, index) => {
      if (items.country_name != "") {
        this.operatorObj[items.country_name].filter((item) => {
          if (item.mnc == items.mnc) {
            item.isSelected = false;
          }
        });
      }
    });
  }

  countryOperatorListData(value: FormArray, indexed: number) {
    const groupsControl = this.getcountryControl();
    groupsControl.markAsUntouched();
    this.isEditMode = true;
    this.isIndexed = indexed;
    this.getOperatorList(value["country_code"], value["country_name"]);
    groupsControl.at(0).patchValue(value);
    this.stepper.selectedIndex = 0;
  }

  onCountryOpertatorFormSubmit(data) {
    this.Psubmitted = true
    data.billing_rate_row = data.ratetype_row == 'standard' ? '' : data.billing_rate_row;
    if (data.ratetype_row == 'standard') {
      this.parentForm.get('billing_rate_row').clearValidators();
      this.parentForm.get('billing_rate_row').updateValueAndValidity();
   } else if (data.ratetype_row == 'custom') {
      this.parentForm.get('billing_rate_row').setValidators([Validators.required, Validators.pattern('^([0-9]+(\.[0-9]+)?)')]);
      this.parentForm.get('billing_rate_row').updateValueAndValidity();
   }

   if (this.parentForm.invalid) {
    return
 } else {
   this.Psubmitted = false
  this.billpancountryOptorService.BillPlanCreateCountryOperator(data).subscribe(
    (res: BillPlanCreateCountryOperator_ApiResponse) => {
       if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          successAlert(res.message, res.responsestatus)
          this.router.navigate(['billplan-management-postpaid/' + data.billplan_id]);
       } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
       }
    }, (error: HttpErrorResponse) => {
       errorAlert(error.message, error.statusText)
    }
 );
 }

  }
}
