import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { MobileCustomRouteService } from "src/app/route-management/services/RouteManagement/custom-route/mobile-custom-route.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomService } from "src/app/route-management/services/RouteManagement/custom-route/custom.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {
  CustomGateway_ApiResponse,
  CustomGateway_Data,
  MobileCustomResponse,
} from "src/app/route-management/models/custom.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  successAlert,
} from "../../../../shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import { ValidationConfigs } from '../../../../model/authorization.model';
import Swal from 'sweetalert2';
import { MobileBlackList_AddResponse, MobileBlackList_AddData } from 'src/app/route-management/models/BlackList/blacklist.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { accountType } from 'src/app/shared/helper/globalVariables';

@Component({
  selector: "app-mobile-route",
  templateUrl: "./mobile-route.component.html",
  styleUrls: ["./mobile-route.component.css"],
})
export class MobileRouteComponent implements OnInit {
  accounts: string[] = accountType
  mobileRouteForm: FormGroup;
  submitted = false;
  cMobileUpload: any = "";
  fileData: FormData = null;
  gatewayListApiResponse: CustomGateway_ApiResponse;
  gatewayListData: CustomGateway_Data;
  fileResponse: MobileBlackList_AddResponse
filResponseData: MobileBlackList_AddData
@ViewChild('priceListSubmitSuccess', { static: true })
  priceListSubmitSuccess: TemplateRef<any>;
  validationConfigs: ValidationConfigs;
  constructor(
    public router: Router,
    public customService: CustomService,
    public mobileCustomService: MobileCustomRouteService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public authService: AuthorizationService
  ) {
    this.validationConfigs = authService.authorizationState.validation_configs;
  }

  ngOnInit() {
    this.getGatewayList();
    this.initForm();
  }
  /**
   * @description form initialization
   */
  private initForm() {
    this.mobileRouteForm = this.formBuilder.group({
      whitelist_type: ["Global", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern(this.validationConfigs.mobile_pattern)]],
      primary_gw_id: [null, [Validators.required]],
      fallback_gw_id: [null, [Validators.required]],
      comments: [""],
      esmeaddr: [""],
      createdby: [""],
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
    return this.mobileRouteForm.controls;
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
   * @description navigates back to list page
   */
  cancel() {
    // this.router.navigate(["../mobile"], { relativeTo: this.route });
    this.router.navigateByUrl("/route-management/custom-route/mobile");
  }

  /**
   *
   * @description adds the mobile custom route
   */
  addMobileRoute() {
    if (this.fileData) {
      this.submitted = false;
      this.onAddRoute(this.fileData);
      return;
    }
    if (!this.mobileRouteForm.valid) {
      this.submitted = true;
    } else {
      this.mobileRouteForm.value.esmeaddr = this.mobileRouteForm.value.esmeaddr
        ? this.mobileRouteForm.value.esmeaddr
        : 0;
      this.mobileRouteForm.value.req_type = "single_req";
      this.mobileRouteForm.value.createdby = "1234";
      this.mobileRouteForm.value.whitelist_type = this.control.whitelist_type.value.toLowerCase();
      this.onAddRoute({ ...this.mobileRouteForm.value });
    }

  }

  /**
   *
   * @param fileInput selected file to upload
   * @description checks and appends the form data to the selected file
   */
  fileUpload(fileInput) {
    this.fromReset();
    if (fileInput.target.files.length === 0) {
      return;
    }
    const file = fileInput.target.files[0];
    const form = new FormData();
    this.cMobileUpload = file.name;
    form.append("file", file, file.name);
    form.append("req_type", "fileupload");
    form.append(
      "whitelist_type",
      this.mobileRouteForm.value.whitelist_type.toLowerCase()
    );
    form.append("createdby", "1234");
    this.fileData = form;
  }
  /**
   *
   * @param body contains the addroute data
   * @description checks wheather the formtype is form or fomdata
   */
  // onAddRoute(body) {
  //   const formType = this.fileData ? true : false;
  //   this.mobileCustomService.addCustomMobile(body, formType).subscribe(
  //     (data: MobileBlackList_AddResponse) => {
  //       if (data.responsestatus === "failure") {
  //         Swal.fire({
  //           icon: 'error',
  //           title: data.responsestatus,
  //           text: `Success:${data.data.success}
  //                  Duplicate:${data.data.duplicate}
  //                  Failed:${data.data.failed}
  //                  Invalid:${data.data.invalid}
  //                  Total:${data.data.total}`
  //         });
  //         this.fromReset();
  //       } else {
  //         Swal.fire({
  //           icon: 'success',
  //           title: data.responsestatus,
  //           text: `Success:${data.data.success}
  //                  Duplicate:${data.data.duplicate}
  //                  Failed:${data.data.failed}
  //                  Invalid:${data.data.invalid}
  //                  Total:${data.data.total}`
  //         });
  //         this.cancel();
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       errorAlert(error.message, error.statusText);
  //       this.fromReset();
  //     }
  //   );
  // }


  onAddRoute(body) {
    const formType = this.fileData ? true : false;
    this.mobileCustomService.addCustomMobile(body, formType).subscribe(
      (res: MobileBlackList_AddResponse) => {
        this.fileResponse = res;
        this.filResponseData = JSON.parse(JSON.stringify(this.fileResponse));
        if(res.responsestatus === 'success'){

          if(this.fileResponse.data.invalid === 0 && this.fileResponse.data.duplicate === 0){
            successAlert(res.responsestatus, res.message)
            this.fromReset()
          } else {
            // console.log("2323232323232323")
            this.modalService.open(this.priceListSubmitSuccess)
            this.fromReset()
          }
        }  else if (res.responsestatus === 'failure') {
          if(this.fileResponse.data.invalid === 0 && this.fileResponse.data.duplicate === 0) {
            errorAlert(res.responsestatus, res.message)
            this.fromReset()
          } else {
            // console.log("23234234234234234234")
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
    this.mobileRouteForm.markAsUntouched();
    this.mobileRouteForm.markAsPristine();
    this.fileData = null;
    this.cMobileUpload = null;
    this.submitted = false;
    this.emtyForm();
  }

  /**
   * @description resets the form to the default values
   */

  emtyForm() {
    this.mobileRouteForm.patchValue({
      mobile: "",
      primary_gw_id: null,
      fallback_gw_id: null,
      comments: "",
      esmeaddr: "",
      createdby: "",
    });
  }
}
