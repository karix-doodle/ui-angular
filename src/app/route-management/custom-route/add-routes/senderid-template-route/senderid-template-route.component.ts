import { Component, OnInit } from "@angular/core";
import {
  errorAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  CustomGateway_ApiResponse,
  CustomGateway_Data,
  MobileCustomResponse,
} from "src/app/route-management/models/custom.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomService } from "src/app/route-management/services/RouteManagement/custom-route/custom.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { environment } from "src/environments/environment";
import {
  CountriesListRes,
  OperatorsListRes,
} from "src/app/route-management/models/RouteManagement/Generic/generic";
import { SenderCustomService } from "src/app/route-management/services/RouteManagement/custom-route/sender-custom.service";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Component({
  selector: "app-senderid-template-route",
  templateUrl: "./senderid-template-route.component.html",
  styleUrls: ["./senderid-template-route.component.css"],
})
export class SenderidTemplateRouteComponent implements OnInit {
  whitelist_type: string;
  accounts: string[] = ["Global", "Account"];
  priorities: number[] = [0, 1, 2, 3, 4, 5];
  submitted = false;
  cmobilesenderUpload: any = null;
  senderContentFrom: FormGroup;
  selectedFile: FormData = null;
  gatewayListApiResponse: CustomGateway_ApiResponse;
  gatewayListData: CustomGateway_Data;
  countriesData: any = [];
  operatorList: any = [];
  constructor(
    public router: Router,
    public customService: CustomService,
    public mobileSenderTemplateService: SenderCustomService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private authService: AuthorizationService
  ) {}

  ngOnInit() {
    this.whitelist_type = this.accounts[0];
    this.getGatewayList();
    this.initForm();
    this.getCountriesList();
  }

  private initForm() {
    this.senderContentFrom = this.formBuilder.group({
      whitelist_type: ["Global", [Validators.required]],
      country: [null, [Validators.required]],
      operator: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      default_senderid: null,
      template: [""],
      senderid: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]{4,8}")],
      ],
      // senderid: ["", Validators.required],
      primary_gw_id: [null, [Validators.required]],
      fallback_gw_id: [null, [Validators.required]],
      comments: [""],
      esmeaddr: [""],
      createdby: [""],
      req_type: [""],
      mcc: 0,
      mnc: 0,
    });
  }
  /**
   * @description validations added acording to the whitelist_type
   */

  onChange() {
    switch (this.control.whitelist_type.value) {
      case "Account": {
        this.control.esmeaddr.setValidators([
          Validators.required,
          Validators.pattern("[0-9]{3,14}"),
        ]);

        this.fromReset();
        break;
      }
      case "Global": {
        this.control.esmeaddr.setValidators(null);
        this.fromReset();
        break;
      }
    }
  }

  get control() {
    return this.senderContentFrom.controls;
  }

  /**
   * @description navigates back to list page
   */
  cancel() {
    this.router.navigateByUrl("/route-management/custom-route/sender-id");
    // this.router.navigate(['/custom-route/mobile-sender-id']);
  }

  /**
   * @description gets the gateway list
   */
  getGatewayList() {
    this.customService.getCustomRouteGateways().subscribe(
      (res: CustomGateway_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.gatewayListApiResponse = res;
          this.gatewayListData = JSON.parse(
            JSON.stringify(this.gatewayListApiResponse.data)
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
  /**
   * @description gets the country list
   */
  getCountriesList() {
    this.customService
      .getCountriesList()
      .subscribe((data: CountriesListRes) => {
        this.countriesData = data.data;
      });
  }

  /**
   * @param country contains the country data
   * @description gets the operator list
   */
  getCountryBasedOperator(country) {
    console.log(country);
    let countryCode = this.countriesData.find((c) => c.country === country)
      .country_code;
    countryCode = { country_code: countryCode };
    this.customService
      .getOperatorsList(countryCode)
      .subscribe((data: OperatorsListRes) => {
        this.operatorList = data.data;
      });
  }
  /**
   *
   * @description adds the mobile with senderTemplate custom route
   */
  onSubmit() {
    if (this.selectedFile) {
      this.submitted = false;
      this.onAddRoute(this.selectedFile);
      return;
    }

    if (!this.senderContentFrom.valid) {
      this.submitted = true;
    } else {
      this.senderContentFrom.value.template = this.senderContentFrom.value
        .template
        ? this.senderContentFrom.value.template
        : ".*";
      this.senderContentFrom.value.esmeaddr = this.senderContentFrom.value
        .esmeaddr
        ? this.senderContentFrom.value.esmeaddr
        : 0;
      this.senderContentFrom.value.comments = this.senderContentFrom.value
        .comments
        ? this.senderContentFrom.value.comments
        : "";
      this.senderContentFrom.value.mcc = this.countriesData.find(
        (c) => c.country === this.senderContentFrom.value.country
      ).mcc;
      this.senderContentFrom.value.mnc = this.operatorList.find(
        (op) => op.operator === this.senderContentFrom.value.operator
      ).mnc;
      this.senderContentFrom.value.createdby = "1234";
      this.senderContentFrom.value.req_type = "single_req";
      this.senderContentFrom.value.default_senderid = true;
      this.senderContentFrom.value.priority = +this.senderContentFrom.value
        .priority;
      this.senderContentFrom.value.whitelist_type = this.whitelist_type.toLowerCase();
      this.onAddRoute({ ...this.senderContentFrom.value });
    }
  }

  /**
   *
   * @param fileInput selected file to upload
   * @description checks and appends the form data to the selected file
   */

  fileUpload(fileInput) {
    this.submitted = false;
    this.fromReset();
    if (fileInput.target.files.length === 0) {
      return;
    }
    const file = fileInput.target.files[0];
    const form = new FormData();
    this.cmobilesenderUpload = file.name;
    form.append("file", file, file.name);
    form.append("req_type", "fileupload");
    form.append("whitelist_type", this.whitelist_type.toLowerCase());
    form.append("createdby", "1234");
    this.selectedFile = form;
  }

  /**
   *
   * @param body contains the addroute data
   * @description checks wheather the formtype is form or fomdata
   */

  onAddRoute(body) {
    const formType = this.selectedFile ? true : false;
    this.mobileSenderTemplateService
      .addCustomSenderTemplate(body, formType)
      .subscribe(
        (data: MobileCustomResponse) => {
          if (data.responsestatus === "failure") {
            errorAlert(data.message, data.responsestatus);
            this.fromReset();
          } else {
            successAlert(data.message);
            this.cancel();
          }
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
          this.fromReset();
        }
      );
  }

  /**
   * @description resets the form to the default values
   */
  fromReset() {
    this.senderContentFrom.markAsUntouched();
    this.senderContentFrom.markAsPristine();
    this.submitted = false;
    this.selectedFile = null;
    this.cmobilesenderUpload = null;
    this.emptyForm();
  }

  /**
   * @description resets the form to the default values
   */

  emptyForm() {
    this.senderContentFrom.patchValue({
      country: null,
      operator: null,
      priority: null,
      default_senderid: true,
      template: "",
      senderid: [""],
      primary_gw_id: null,
      fallback_gw_id: null,
      comments: "",
      esmeaddr: "",
      createdby: "",
    });
  }
}
