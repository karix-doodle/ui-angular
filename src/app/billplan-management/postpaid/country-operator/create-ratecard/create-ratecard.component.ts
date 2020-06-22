import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

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
  countryOperatorListData: Subject<[FormArray, number]> = new Subject<
    [FormArray, number]
  >();

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.totalCountryOperatorForm = this.formBuilder.group({
      loggedinusername: environment.loggedinempid,
      loggedinempid: environment.loggedinempid,
      billplan_id: [12, [Validators.required]],
      billplan_currencyid: [15, [Validators.required]],
      ratecard_type: ["country-operator", [Validators.required]],
      ratecard_name: [""],
      ratetype_row: ["standard"],
      billing_rate_row: [null],
      discount_rate: [null],
      discount_type: ["Percentage"],
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

    if (index == null) {
      this.duplicates = this.checkDupliactes(event.value[0]);
      if (this.duplicates) {
        return;
      }

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

  editGroups(cindex: number) {
    let groupsControl = this.getcountryOperatorControl();
    console.log([groupsControl.value[cindex], cindex]);
    this.countryOperatorListData.next([groupsControl.value[cindex], cindex]);
  }

  deleteGroups(cindex: number) {
    let groupsControl = this.getcountryOperatorControl();
    groupsControl.value.splice(cindex, 1);
    this.updateRowGroups(groupsControl.value);
  }

  updateRowGroups(value) {
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

  checkDupliactes(value): boolean {
    console.log(value, "123");
    let duplicates = this.countryOperatorArray.some((element) => {
      if (
        element.operator_name === value.operator_name &&
        element.country_name === value.country_name
      ) {
        Swal.fire({
          title: "Duplicates Found!!!",
          text: `Coutry ${value.country_name} has a duplicate Opertor of ${value.operator_name}`,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.value) {
          }
        });
        return true;
      }
    });
    console.log(duplicates, "123");
    return duplicates;
  }
}
