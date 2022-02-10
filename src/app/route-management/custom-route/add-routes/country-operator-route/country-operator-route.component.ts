import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
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
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import { ValidationConfigs } from '../../../../model/authorization.model';
import { MobileBlackList_AddResponse, MobileBlackList_AddData } from 'src/app/route-management/models/BlackList/blacklist.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { accountType, priority } from 'src/app/shared/helper/globalVariables';
import * as _ from 'lodash';
import { CountryOperatorCustomService } from "src/app/route-management/services/RouteManagement/custom-route/country-custom-operator.service";

@Component({
  selector: "app-country-operator-route",
  templateUrl: "./country-operator-route.component.html",
  styleUrls: ["./country-operator-route.component.css"],
})
export class CountryOperatorRouteComponent implements OnInit {
  whitelist_type: string;
  accounts: string[] = accountType
  priorities: number[] = priority
  submitted = false;
  cmobilesenderUpload: any = null;
  senderContentFrom: FormGroup;
  selectedFile: FormData = null;
  gatewayListApiResponse: CustomGateway_ApiResponse;
  gatewayListData: CustomGateway_Data;
  countriesData: any = [];
  operatorList: any = [];
  fileResponse: MobileBlackList_AddResponse
  filResponseData: MobileBlackList_AddData
  @ViewChild('priceListSubmitSuccess', { static: true })
    priceListSubmitSuccess: TemplateRef<any>;
    validationConfigs: ValidationConfigs;
  constructor(
    public router: Router,
    public customService: CustomService,
    public countryOperatorSevice: CountryOperatorCustomService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public authService: AuthorizationService
  ) {
    this.validationConfigs = authService.authorizationState.validation_configs;
  }

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
          Validators.pattern(this.validationConfigs.esmeaddr_pattern),
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
    this.router.navigateByUrl("/route-management/custom-route/country");
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
    // console.log(country);
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
      this.senderContentFrom.value.mnc = this.senderContentFrom.value.operator;
      this.senderContentFrom.value.operator = this.operatorList.find(
        (op) => _.isEqual(_.trim(op.mnc),this.senderContentFrom.value.operator)
      ).operator;
      this.senderContentFrom.value.createdby = "1234";
      this.senderContentFrom.value.req_type = "single_req";
      this.senderContentFrom.value.priority = +this.senderContentFrom.value
        .priority;
        this.senderContentFrom.value.whitelist_type = this.control.whitelist_type.value.toLowerCase();
      // this.senderContentFrom.value.whitelist_type = this.whitelist_type.toLowerCase();
      // console.log(this.senderContentFrom.value)
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
    // ID-84 - whitelist_type always going as global
    //form.append("whitelist_type", this.whitelist_type.toLowerCase());
    form.append("whitelist_type", this.control.whitelist_type.value.toLowerCase());
    form.append("createdby", "1234");
    this.selectedFile = form;
  }


  onAddRoute(body) {
    const formType = this.selectedFile ? true : false;
    this.countryOperatorSevice.addCustomCountryOperator(body, formType).subscribe(
      (res: MobileBlackList_AddResponse) => {
        this.fileResponse = res;
        this.filResponseData = JSON.parse(JSON.stringify(this.fileResponse));
        if(res.responsestatus === 'success'){

          if(this.fileResponse.data.invalid === 0 && this.fileResponse.data.duplicate === 0){
            successAlert(res.responsestatus, res.message)
            this.fromReset()
          } else {
            this.modalService.open(this.priceListSubmitSuccess)
            this.fromReset()
          }
        }  else if (res.responsestatus === 'failure') {
          if(this.fileResponse.data.invalid === 0 && this.fileResponse.data.duplicate === 0) {
            errorAlert(res.responsestatus, res.message)
            this.fromReset()
          } else {
            this.modalService.open(this.priceListSubmitSuccess)
            this.fromReset()
          }
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
      primary_gw_id: null,
      fallback_gw_id: null,
      comments: "",
      esmeaddr: "",
      createdby: "",
    });
  }
}