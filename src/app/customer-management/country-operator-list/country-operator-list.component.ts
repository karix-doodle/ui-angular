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
  BillOnSubmissionCountryListApi_Response,
  BillOnSubmissionCountryList_Data,
} from "../models/customer-management.model";
import { environment } from "../../../environments/environment";
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: "app-country-operator-list",
  templateUrl: "./country-operator-list.component.html",
  styleUrls: ["./country-operator-list.component.css"],
})
export class CountryOperatorListComponent implements OnInit {
  searchValue: string = ""
  senderidForm: FormGroup;
  billSubmissionForm: FormGroup;
  esmeaddr: number;
  getcountryListApiResponse: AllowedCountryApi_Response;
  countryList: AllowedCountry_Data[] = [];
  getOperatorListApiaResponse: AllowedOperatorApi_Response;
  operatorList: AllowedOperator_Data[] = [];
  billSubCountryList: BillOnSubmissionCountryList_Data[] = []
  allowedCountyrOperatorList: AllowedCountryOperTable[];
  allowedCoutryOpertorDetails;
  isSubmitted = false;
  hasdata: boolean = false
  billSubmitted: boolean = false

  CmAuthControls = null

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private service: CustomerManagementService,
    private fb: FormBuilder,
    private authorizationService: AuthorizationService
  ) {
    this.CmAuthControls = this.authorizationService.authorizationState.customer_management;

    this.esmeaddr = +this.route.snapshot.params.id;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    if (this.CmAuthControls.cust_existing_customer_detailed_view_listing_allowed_countries_operators_list_enabled) {
      this.getCountryOperatorlist();
    }
    if (this.CmAuthControls.cust_existing_customer_detailed_view_allowed_countries_operators_add_or_delete_alternate_senderids_enabled) {
      this.GetCountryList();
    }
    this.initForm();
    this.initialForm();
    this.getBillSubCountrylist();
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

  private initialForm() {
    this.billSubmissionForm = this.fb.group({
      country: ['', [Validators.required]],
      mcc: ['', [Validators.required]],
      billonsub: ['', [Validators.required]]
    })
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
        mnc: ''
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


  handleCountry(key, event) {
    let mcc = event.target.options[
      event.target["selectedIndex"]
    ].getAttribute("data-value");
    let billonSub = event.target.options[
      event.target["selectedIndex"]
    ].getAttribute("sub-value");
    let obj = {};
    obj[key] = mcc;
    this.billSubmissionForm.patchValue({
      billonsub: billonSub
    })
    this.billSubmissionForm.patchValue(obj);
  }

  getSenderidDetails() {
    let data = {
      esmeaddr: +this.route.snapshot.params.id,
      mnc: this.senderidForm.get("mnc").value,
      mcc: this.senderidForm.get("mcc").value
    }
    this.service.getSenderidsList(data).subscribe((res: GetSenderisApi_Response) => {
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        console.log(res, '23456')
        if (res.data.hasdata) {
          this.hasdata = res.data.hasdata
          this.senderidForm.patchValue({
            senderid_type: res.data.senderids.senderid_type,
            default_senderid: res.data.senderids.default_senderid,
            alternate_senderid: res.data.senderids.alternate_senderid,
          })
        } else {
          this.hasdata = res.data.hasdata
          this.senderidForm.patchValue({
            senderid_type: '',
            default_senderid: '',
            alternate_senderid: '',
          })
        }

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

  getBillSubCountrylist() {
    this.service.getBillSubmissionCountylist(+this.route.snapshot.params.id).subscribe(
      (res: BillOnSubmissionCountryListApi_Response) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.billSubCountryList = res.data

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

  onBillSubmit() {
    let data = {
      ...this.billSubmissionForm.value,
      esmeaddr: this.esmeaddr,
    };
    this.billSubmitted = true;
    if (!this.billSubmissionForm.valid) {
      return;
    }
    this.service.addBillOnubmit(data).subscribe(
      (res: AddSenderIdApi_Response) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.resetBillForm();
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

  resetBillForm() {
    this.billSubmitted = false
    this.modalService.dismissAll("billOnSubmit");
    this.billSubmissionForm.patchValue({
      country: '',
      mcc: '',
      billonsub: ''
    });
  }
}
