import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { environment } from "src/environments/environment";
import { count } from "../../../../shared/helper/helperFunctions";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
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
  countryLisData: Subject<[FormArray, number]> = new Subject<
    [FormArray, number]
  >();
  handleCountryDelete: Subject< number> = new Subject<
     number
  >();
  constructor(private _formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.totalCountryForm = this._formBuilder.group({
      loggedinusername: environment.loggedinusername,
      loggedinempid: environment.loggedinempid,
      billplan_id: [12, [Validators.required]],
      billplan_currencyid: [15, [Validators.required]],
      ratecard_type: ["country", [Validators.required]],
      ratecard_name: [""],
      ratetype_row: ["standard"],
      billing_rate_row: [null],
      billing_rate: [""],
      discount_rate: [null],
      discount_type: ["Percentage"],
      description: [""],
      countries: this._formBuilder.array([this.countryArrayForm()]),
    });
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
