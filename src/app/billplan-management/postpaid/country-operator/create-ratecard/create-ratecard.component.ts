import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';
import { BillPlanCurrency_ApiResponse, BillPlanCurrency_Data, CurrencySybmol, Currency } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-create-ratecard",
  templateUrl: "./create-ratecard.component.html",
  styleUrls: ["./create-ratecard.component.css"],
})
export class CreateRatecardComponent implements OnInit {
  totalCountryOperatorForm: FormGroup;
  countryCount: number = 0;
  OperatorCount: number = 0;
  countryOperatorArray = [];
  duplicates: boolean = false;
  editMode: boolean = false;
  billplan_id
  billplan_currencyid
  ratecard_name
  currencySybmol: CurrencySybmol = new CurrencySybmol();
  bCurrency: Currency = new Currency();
  nCurrency: Currency = new Currency();
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  countryOperatorListData: Subject<[FormArray, number]> = new Subject<
    [FormArray, number]
  >();
  handleCountryDelete: Subject<[string, number]> = new Subject<
    [string, number]
  >();
  handlecurrencyList: Subject<CurrencySybmol> = new Subject<CurrencySybmol>();
  searchvalue: string = ''
  constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private billPlanservice: BillManagementService,) {
    this.initForm();
    this.billplan_id = +this.activeRoute.snapshot.params.bId
    this.billplan_currencyid = +this.activeRoute.snapshot.params.cId
    this.ratecard_name = this.activeRoute.snapshot.params.name
  }

  ngOnInit() {
    this.getBillPlanCurrency();
  }

  private initForm() {
    this.totalCountryOperatorForm = this.formBuilder.group({
      billplan_id: +this.activeRoute.snapshot.params.bId,
      billplan_currencyid: +this.activeRoute.snapshot.params.cId,
      ratecard_type: ["country-operator", [Validators.required]],
      ratecard_name: this.activeRoute.snapshot.params.name,
      ratetype_row: ["standard"],
      billing_rate_row: ['', [Validators.required, Validators.pattern('^[1-9]{1}$|^[0-9]{2,10}$|^[0-9]{1}([\.][0-9]{1,6})$|^[0-9]{2,4}([\.][0-9]{1,6})?$')]],
      discount_rate: [''],
      discount_type: [''],
      description: [''],
      countries: this.formBuilder.array([this.countryArrayForm()]),
    });
  }

  private countryArrayForm(): FormGroup {
    return this.formBuilder.group({
      country_name: [""],
      operator_name: [""],
      billing_rate: [""],
      mnc: [""],
      mcc: [""],
      normalize_rate: [""],
    });
  }

  getBillPlanCurrency() {
    this.billPlanservice.BillPlancurrency().subscribe(
      (res: BillPlanCurrency_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {

          this.billPlanCurrencyRes = res;
          this.billPlanCurrencyData = JSON.parse(JSON.stringify(this.billPlanCurrencyRes));
          this.billPlanCurrencyRes.data.filter((item) => {
            if (item.currency_id == this.activeRoute.snapshot.params.cId) {
              this.bCurrency.symbol = item.currency_symbol;
              this.bCurrency.id = item.currency_id;
            }
            if (item.currency_id == environment.currencyDefault) {
              this.nCurrency.symbol = item.currency_symbol;
              this.nCurrency.id = item.currency_id;
            }
          });
          this.currencySybmol.bCurrency = this.bCurrency;
          this.currencySybmol.nCurrency = this.nCurrency;

          this.handlecurrencyList.next(this.currencySybmol);

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
  getcountryOperatorControl(): FormArray {
    return <FormArray>this.totalCountryOperatorForm.controls["countries"];
  }

  countryListData([event, index]) {
    let parentGroupArray = this.getcountryOperatorControl();

   if(event != null){
    if (index == null) {

      if (
        parentGroupArray.value.length == 1 &&
        parentGroupArray.value[0].country_name == ""
      ) {
        parentGroupArray.value[0] = event.value[0];
      } else {
        parentGroupArray.value.push(event.value[0]);
      }
    } else {
      parentGroupArray.value[index] = event.value[0];
    }
    this.updateRowGroups(parentGroupArray.value);
   }
   this.editMode = false
   console.log(this.countryOperatorArray)
  }

  editGroups(cindex: number) {
    if(this.editMode == false){
      this.editMode = true;
    let groupsControl = this.getcountryOperatorControl();
    console.log([groupsControl.value[cindex], cindex]);
    this.countryOperatorListData.next([groupsControl.value[cindex], cindex]);
    }
  }

  deleteGroups(cindex: number, item) {
    let groupsControl = this.getcountryOperatorControl();
    if (this.editMode == false) {
      this.handleCountryDelete.next([item.country_name, item.mnc]);
      groupsControl.value.splice(cindex, 1);
      this.updateRowGroups(groupsControl.value);
    }


  }

  updateRowGroups(value) {
    this.editMode = false;
    this.countryOperatorArray = JSON.parse(JSON.stringify(value));
    this.countryCount = this.count("country_name");
    this.OperatorCount = this.count("operator_name");
  }

  count(params) {
    const uniqueId = new Set();
    this.countryOperatorArray.forEach((element) => {
      uniqueId.add(element[params]);
    });
    return uniqueId.size;
  }

  // checkDupliactes(value): boolean {
  //   console.log(value, "123");
  //   let duplicates = this.countryOperatorArray.some((element) => {
  //     if (
  //       element.operator_name === value.operator_name &&
  //       element.country_name === value.country_name
  //     ) {
  //       Swal.fire({
  //         title: "Duplicates Found!!!",
  //         text: `Coutry ${value.country_name} has a duplicate Opertor of ${value.operator_name}`,
  //         icon: "warning",
  //         confirmButtonColor: "#3085d6",
  //         confirmButtonText: "Ok",
  //       }).then((result) => {
  //         if (result.value) {
  //         }
  //       });
  //       return true;
  //     }
  //   });
  //   console.log(duplicates, "123");
  //   return duplicates;
  // }
}
