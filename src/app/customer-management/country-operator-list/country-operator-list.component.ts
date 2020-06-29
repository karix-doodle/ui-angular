import { Component, OnInit } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerManagementService } from "../services/customer-management-view.service";
import { ActivatedRoute } from "@angular/router";
import {
  AllowedCountryOperatorList,
  AllowedCountryOperTable,
  AllowedCountry_Data,
  AllowedCountryApi_Response,
  AllowedOperatorApi_Response,
  AllowedOperator_Data,
  AddSenderIdApi_Response,
  GetSenderisApi_Response,
} from "../models/customer-management.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-country-operator-list",
  templateUrl: "./country-operator-list.component.html",
  styleUrls: ["./country-operator-list.component.css"],
})
export class CountryOperatorListComponent implements OnInit {
  searchValue: string = ""
  senderidForm: FormGroup;
  esmeaddr: number;
  getcountryListApiResponse: AllowedCountryApi_Response;
  countryList: AllowedCountry_Data[] = [];
  getOperatorListApiaResponse: AllowedOperatorApi_Response;
  operatorList: AllowedOperator_Data[] = [];
  allowedCountyrOperatorList: AllowedCountryOperTable[];
  allowedCoutryOpertorDetails;
  isSubmitted = false;
  hasdata: boolean = false
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private service: CustomerManagementService,
    private fb: FormBuilder
  ) {
    this.esmeaddr = +this.route.snapshot.params.id;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.getCountryOperatorlist();
    this.GetCountryList();
    this.initForm();
  }

  private initForm() {
    this.senderidForm = this.fb.group({
      country: ["", Validators.required],
      mcc: ["", Validators.required],
      operator: ["", Validators.required],
      mnc: ["", Validators.required],
      senderid_type: ["", Validators.required],
      default_senderid: [
        "",
        [Validators.required, Validators.pattern("^.{6,8}$")],
      ],
      alternate_senderid: ["", [Validators.pattern("^.{6,8}$")]],
    });
  }
  getcountryControl() {
    return this.senderidForm.controls;
  }

  handleCountryOperator(key, event) {
    let value = event.target.options[
      event.target["selectedIndex"]
    ].getAttribute("data-value");
    let obj = {};
    obj[key] = value;
    this.senderidForm.patchValue(obj);
    if (key === "mcc") {
      this.senderidForm.patchValue({
        operator: '',
      })
      this.getOperatorlist(value);

    }

    if (
      this.senderidForm.get("mnc").value &&
      this.senderidForm.get("mcc").value
    ) {
      this.getSenderidDetails();
    }
  }

  getSenderidDetails(){
    let data = {
      esmeaddr: 70066200000000,
      mnc:0,
      mcc: 276
    }
    this.service.getSenderidsList(data).subscribe((res: GetSenderisApi_Response ) =>{
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
         console.log(res ,'23456')
            if(res.data.hasdata){
              this.hasdata = res.data.hasdata
              this.senderidForm.patchValue({
               senderid_type: res.data.senderids.senderid_type,
             default_senderid: res.data.senderids.default_senderid,
             alternate_senderid: res.data.senderids.alternate_senderid,
              })
            }

      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        errorAlert( res.responsestatus);
      }
    },
    (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText);
    }
  );

  }

  onsenderidsubmit() {
    let data = {
      ...this.senderidForm.value,
      esmeaddr: this.esmeaddr,
    };
    this.isSubmitted = true;
    if (!this.senderidForm.valid) {
      return;
    }
    this.service.addSenderidSubmit(data).subscribe(
      (res: AddSenderIdApi_Response) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.resetForm();
          successAlert(res.message, res.responsestatus);

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

  getCountryOperatorlist() {
    this.service.getAllowedOperatorlistdDetails(this.esmeaddr).subscribe(
      (res: AllowedCountryOperatorList) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.allowedCountyrOperatorList = res.data.list;
          this.allowedCoutryOpertorDetails = res.data;
          console.log(res, "12345");
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

  getOperatorlist(mcc: number) {
    let data = {
      esmeaddr: this.route.snapshot.params.id,
      load: "operator",
      mcc: mcc,
    };
    this.service.getAllowedOperatorlist(data).subscribe(
      (res: AllowedOperatorApi_Response) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.getOperatorListApiaResponse = res;
          this.operatorList = JSON.parse(
            JSON.stringify(this.getOperatorListApiaResponse.data)
          );
          console.log(res, "12345");
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


  GetCountryList() {
    let data = {
      esmeaddr: this.route.snapshot.params.id,
      load: 'country',
    }
    this.service.getAllowedCOuntylist(data).subscribe(
      (res: AllowedCountryApi_Response) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.getcountryListApiResponse = res;
          this.countryList = JSON.parse(JSON.stringify(this.getcountryListApiResponse));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  resetForm() {
    this.isSubmitted = false
    this.hasdata = false
    this.modalService.dismissAll("senderIdModal");
    this.senderidForm.patchValue({
      country: '',
      mcc: '',
      operator: '',
      mnc: '',
      senderid_type: '',
      default_senderid: '',
      alternate_senderid: '',
    });
  }
}
