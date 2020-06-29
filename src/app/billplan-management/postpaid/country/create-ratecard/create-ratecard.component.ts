import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { environment } from "src/environments/environment";
import { count } from "../../../../shared/helper/helperFunctions";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router';
import { BillManagementService } from 'src/app/billplan-management/services/BillManagement/billplan-management.service';
import { BillPlanCurrency_ApiResponse, BillPlanCurrency_Data } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: "app-create-ratecard",
  templateUrl: "./create-ratecard.component.html",
  styleUrls: ["./create-ratecard.component.css"],
})
export class CreateRatecardComponent implements OnInit {
  totalCountryForm: FormGroup;
  countrtyCount: number = 0;
  countriesArray = [];
  duplicates: boolean = false;
  editMode: boolean = false
  billplan_id: number;
  billplan_currencyid
  ratecard_name
  countryLisData: Subject<[FormArray, number]> = new Subject<
    [FormArray, number]
  >();
  handleCountryDelete: Subject< number> = new Subject<
     number
  >();
  currencySybmol: object = {
    bCurrency: '',
    nCurrency: ''
  }
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;
  handlecurrencyList: Subject<[object]> = new Subject<[object]>();
  constructor(private _formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private billPlanservice: BillManagementService,) {
    this.initForm();
    this.billplan_id = +this.activeRoute.snapshot.params.bId
      this.billplan_currencyid = this.activeRoute.snapshot.params.cId
      this.ratecard_name = this.activeRoute.snapshot.params.name

  }

  ngOnInit() {
    this.getBillPlanCurrency();
  }

  private initForm() {
    this.totalCountryForm = this._formBuilder.group({
      billplan_id: +this.activeRoute.snapshot.params.bId,
      billplan_currencyid:  +this.activeRoute.snapshot.params.cId,
      ratecard_type: ["country"],
      ratecard_name:  this.activeRoute.snapshot.params.name,
      ratetype_row: ["standard"],
      billing_rate_row: ['', [Validators.pattern('^([0-9]+(\.[0-9]+)?)')]],
      discount_rate: [''],
      discount_type: ["percentage"],
      description: [""],
      countries: this._formBuilder.array([this.countryArrayForm()]),
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
  countryArrayForm(): FormGroup {
    return this._formBuilder.group({
      country_name: [""],
      billing_rate: [""],
      mcc: [""],
      normalize_rate: [""],
    });
  }

  getcountryControl(): FormArray {
    return <FormArray>this.totalCountryForm.controls["countries"];
  }

  countryListData([event, index]) {
    let parentGroupArray = this.getcountryControl();

    if(event !== null){
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

    this.countrtyCount = this.count("country_name");
    this.editMode = false
  }

  editGroups(cindex: number) {
    if(this.editMode == false){
      this.editMode = true
      let groupsControl = this.getcountryControl();
      this.countryLisData.next([groupsControl.value[cindex], cindex]);
    }

  }

  deleteGroups(cindex: number, item) {
    let groupsControl = this.getcountryControl();
    if(this.editMode == false){
      this.handleCountryDelete.next(item.mcc);
      groupsControl.value.splice(cindex, 1);
      this.updateRowGroups(groupsControl.value);
    }

  }

  updateRowGroups(value) {
    this.editMode = false
    this.countriesArray = JSON.parse(JSON.stringify(value));
    this.countrtyCount = this.count("country_name");
  }

  count(params) {
    const uniqueId = new Set();
    this.countriesArray.forEach((element) => {
      uniqueId.add(element[params]);
    });
    return uniqueId.size;
  }

  // checkDupliactes(value): boolean {
  //   console.log(value, "123");
  //   let duplicates = this.countriesArray.some((element) => {
  //     if (element.country_name === value.country_name) {
  //       Swal.fire({
  //         title: "Duplicates Found!!!",
  //         text: `Country ${value.country_name} is a duplicate!`,
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
