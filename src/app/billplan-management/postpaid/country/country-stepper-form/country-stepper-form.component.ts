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
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { BillManagementService } from "src/app/billplan-management/services/BillManagement/billplan-management.service";
import {
  BillPlanCountries_ApiRespone,
  BillPlanCountries_Data,
  BillPlanCreateCountry_ApiResponse,
  CurrencyRateRes,
} from "src/app/billplan-management/models/BillManagement/blillplan.models";
import {
  errorAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import * as _ from "lodash";
import { Subscription, Observable } from "rxjs";
import Swal from "sweetalert2";
import { MatStepper } from "@angular/material";
import { element } from "protractor";
import { count } from "console";
import { BillplanCountryService } from "src/app/billplan-management/services/BillManagement/billplan-country/billplan-country.service";
import { Router } from "@angular/router";

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
  @Input() countriesArray: [];
  @Input() handleCountryDelete: Observable<number>;
  private eventHandleCountryDelete: Subscription;
  @Output() countryList = new EventEmitter<[FormArray, number]>();
  @ViewChild("stepper", { static: false }) stepper: MatStepper;
  Submitted: boolean = false;
  countryObj: object = {};
  conversionRate: number;
  private eventCurrencyList: Subscription;
  @Input() handlecurrencyList: Observable<[object]>;
  operatorObj: object = {};
  currencySybmol: object = {
    bCurrency: "",
    nCurrency: "",
  };

  Psubmitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    config: NgbModalConfig,
    private billPlanservice: BillManagementService,
    private billplancountryService: BillplanCountryService,
    private router: Router
  ) {}

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
    this.eventHandleCountryDelete = this.handleCountryDelete.subscribe(
      (value) => {
        this.handleCountryListDelete(value);
      }
    );
    this.eventCurrencyList = this.handlecurrencyList.subscribe(([value]) => {
      this.handleCurrencyData(value);
    });

    this.initCurrencyConversion();
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
          const modifiedData = this.billPalnApiResponse.data.map(
            (rawProduct) => {
              return { ...rawProduct, isSelected: false }; // added IsSelected key for dropdown.
            }
          );
          this.billPalnApiResponse.data = modifiedData;
          this.billPlanCountryList = JSON.parse(
            JSON.stringify(this.billPalnApiResponse.data)
          );

          console.log(this.billPlanCountryList);
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
  handleCurrencyData(value) {
    this.currencySybmol = value;
    console.log(value, "asdasd");
  }

  handleCountryOperator(indexCountries, key, event, country) {
    console.log(country);

    let value = event.target.options[
      event.target["selectedIndex"]
    ].getAttribute("data-value");
    const countriesControl = this.getcountryControl();
    this.billPlanCountryList.filter((item) => {
      if (item.mcc == countriesControl.value[0].mcc) {
        item.isSelected = false;
      }
    });

    let obj = {};
    obj[key] = value;
    countriesControl.at(indexCountries).patchValue(obj);

    this.billPlanCountryList.forEach((el, i) => {
      if (el.country === country) {
        this.billPlanCountryList[i].isSelected = true;
      }
    });
  }

  handleCountryListDelete(value) {
    this.billPlanCountryList.filter((item) => {
      if (item.mcc == value) {
        item.isSelected = false;
      }
    });
  }

  countryArrayForm(): FormGroup {
    return this._formBuilder.group({
      country_name: [null, Validators.required],
      billing_rate: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[1-9]{1}$|^[0-9]{2,10}$|^[0-9]{1}([.][0-9]{1,6})$|^[0-9]{2,4}([.][0-9]{1,6})?$"
          ),
        ],
      ],
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
      this.resetForm();
      this.isEditMode = false;
      this.isIndexed = null;
    }
  }

  resetForm() {
    this.firstFormGroup = this._formBuilder.group({
      countries: this._formBuilder.array([this.countryArrayForm()]),
    });
  }
  stepperView(stepper: MatStepper, prevIndex: number, index: number) {
    if (this.firstFormGroup.untouched == true) {
      this.isIndexed = null;
      this.resetForm();
      this.isEditMode = false;
      this.countryList.emit([null, null]);
      stepper.next();
      this.firstFormGroup.markAsUntouched;
      this.Submitted = false;
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

  checkRate(data: Number, form: FormGroup, key: string) {
    let hasDot = data.toString().split(".");
    let BillingRate = data.toString();

    if (hasDot.length == 2) {
      if (RegExp("^[0]+$").test(hasDot[0])) {
        BillingRate =
          Number("0" + "." + hasDot[0])
            .toString()
            .replace(/^0+/, "") +
          Number("0" + "." + hasDot[1])
            .toString()
            .replace(/^0+/, "");
      } else {
        BillingRate =
          hasDot[0] +
          Number("0" + "." + hasDot[1])
            .toString()
            .replace(/^0+/, "");
      }
    }

    let dotIndex = BillingRate.indexOf(".");

    if (dotIndex == 0) {
      BillingRate = "0" + BillingRate;
    }

    if (form != undefined) {
      let obj = {};
      obj[key] = BillingRate;
      form.patchValue(obj);
    }

    return BillingRate;
  }

  round(data, form: FormGroup) {
    let NormalizedRate =
      data == 0 ? 0 : (data * this.conversionRate).toFixed(6);
    let hasDot = NormalizedRate.toString().split(".");

    if (hasDot.length == 2) {
      if (RegExp("^[0]+$").test(hasDot[0])) {
        NormalizedRate =
          Number("0" + "." + hasDot[0])
            .toString()
            .replace(/^0+/, "") +
          Number("0" + "." + hasDot[1])
            .toString()
            .replace(/^0+/, "");
      } else {
        NormalizedRate =
          hasDot[0] +
          Number("0" + "." + hasDot[1])
            .toString()
            .replace(/^0+/, "");
      }
    }

    let dotIndex = NormalizedRate.toString().indexOf(".");

    if (dotIndex == 0) {
      NormalizedRate = "0" + NormalizedRate;
    }

    if (form != undefined) {
      form.patchValue({
        normalize_rate: NormalizedRate,
      });
    }
    return NormalizedRate;
  }
  // ------------------- common ----------------------------------

  // ------------------- Parent(First) Form -------------------
  initCurrencyConversion() {
    this.billPlanservice
      .getCurrencyRate(this.parentForm.value.billplan_currencyid)
      .subscribe(
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
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
  }

  reActiveOperator() {
    const countriesControl = this.getcountryControl();
    countriesControl.value.forEach((items, index) => {
      if (items.country_name != "") {
        this.billPlanCountryList.filter((item) => {
          if (item.mcc == items.mcc) {
            item.isSelected = false;
          }
        });
      }
    });
  }

  handleDiscountType() {
    if (this.parentForm.value.discount_type == "percentage") {
      this.parentForm
        .get("discount_rate")
        .setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
      this.parentForm.get("discount_rate").updateValueAndValidity();
    } else if (this.parentForm.value.discount_type == "unit") {
      this.parentForm
        .get("discount_rate")
        .setValidators([
          Validators.required,
          Validators.pattern("^([0-9]+(.[0-9]+)?)"),
        ]);
      this.parentForm.get("discount_rate").updateValueAndValidity();
    } else {
      this.parentForm.patchValue({
        discount_rate: "",
      });
      this.parentForm.get("discount_rate").clearValidators();
      this.parentForm.get("discount_rate").updateValueAndValidity();
    }
  }

  countryListData(value: FormArray, indexed: number) {
    const groupsControl = this.getcountryControl();
    groupsControl.at(0).patchValue(value);
    groupsControl.markAsUntouched();
    this.isEditMode = true;
    this.isIndexed = indexed;
    this.stepper.selectedIndex = 0;
  }

  onCountryFormSubmit(data) {
    this.Psubmitted = true;
    data.billing_rate_row =
      data.ratetype_row == "standard" ? "" : data.billing_rate_row;
    if (data.ratetype_row == "standard") {
      this.parentForm.get("billing_rate_row").clearValidators();
      this.parentForm.get("billing_rate_row").updateValueAndValidity();
    } else if (data.ratetype_row == "custom") {
      this.parentForm
        .get("billing_rate_row")
        .setValidators([
          Validators.required,
          Validators.pattern("^([0-9]+(.[0-9]+)?)"),
        ]);
      this.parentForm.get("billing_rate_row").updateValueAndValidity();
    }

    if (this.parentForm.invalid) {
      return;
    } else {
      this.Psubmitted = false;
      this.billplancountryService.BillPlanCreateCountry(data).subscribe(
        (res: BillPlanCreateCountry_ApiResponse) => {
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            successAlert(res.message, res.responsestatus);
            this.router.navigate([
              "billplan-management-postpaid/" + data.billplan_id,
            ]);
          } else if (
            res.responsestatus === environment.APIStatus.error.text &&
            res.responsecode < environment.APIStatus.error.code
          ) {
            errorAlert(res.message, res.responsestatus);
          }
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
    }
  }
}
