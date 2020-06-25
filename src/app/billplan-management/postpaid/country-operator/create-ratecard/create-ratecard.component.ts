import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router';

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
  countryOperatorListData: Subject<[FormArray, number]> = new Subject<
    [FormArray, number]
  >();
  handleCountryDelete: Subject<[string, number]> = new Subject<
    [string, number]
  >();

  constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute) {
    this.initForm();
    this.billplan_id = this.activeRoute.snapshot.params.bid
    this.billplan_currencyid = this.activeRoute.snapshot.params.cid
    this.ratecard_name = this.activeRoute.snapshot.params.name
  }

  ngOnInit() {}

  private initForm() {
    this.totalCountryOperatorForm = this.formBuilder.group({
      billplan_id: this.billplan_id,
      billplan_currencyid: this.billplan_currencyid,
      ratecard_type: ["country-operator", [Validators.required]],
      ratecard_name: this.ratecard_name,
      ratetype_row: ["standard"],
      billing_rate_row: [null],
      discount_rate: [null],
      discount_type: ["percentage"],
      description: [""],
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
