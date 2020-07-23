import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { MobileSenderidCustomService } from "src/app/route-management/services/RouteManagement/custom-route/mobile-custom-senderid.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomService } from "src/app/route-management/services/RouteManagement/custom-route/custom.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  CustomGateway_ApiResponse,
  CustomGateway_Data,
  MobileCustomSenderIdResponse,
  MobileCustomResponse,
} from "src/app/route-management/models/custom.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  successAlert,
} from "../../../../shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import { MobileBlackList_AddResponse, MobileBlackList_AddData } from 'src/app/route-management/models/BlackList/blacklist.model';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-senderid-mobile-route",
  templateUrl: "./senderid-mobile-route.component.html",
  styleUrls: ["./senderid-mobile-route.component.css"],
})
export class SenderidMobileRouteComponent implements OnInit {
  whitelist_type: string;
  accounts: string[] = ["Global", "Account"];
  submitted = false;
  cmobilesenderUpload: any;
  senderIdFrom: FormGroup;
  selectedFile: FormData = null;
  gatewayListApiResponse: CustomGateway_ApiResponse;
  gatewayListData: CustomGateway_Data;
  fileResponse: MobileBlackList_AddResponse
  filResponseData: MobileBlackList_AddData
  @ViewChild('priceListSubmitSuccess', { static: true })
    priceListSubmitSuccess: TemplateRef<any>;
  constructor(
    public router: Router,
    public customService: CustomService,
    public mobileSenderIdCustomService: MobileSenderidCustomService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public authService: AuthorizationService
  ) {}

  ngOnInit() {
    this.whitelist_type = this.accounts[0];
    this.getGatewayList();
    this.initForm();
  }

  /**
   * @description form initialization
   */

  private initForm() {
    this.senderIdFrom = this.formBuilder.group({
      whitelist_type: ["Global", [Validators.required]],
      mobile: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("[0-9]{10,14}"),
        ],
      ],
      senderid: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]{4,8}")],
      ],
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
    return this.senderIdFrom.controls;
  }

  /**
   * @description navigates back to list page
   */
  cancel() {
    this.router.navigateByUrl(
      "/route-management/custom-route/mobile-sender-id"
    );
    // this.router.navigate(['/custom-route/mobile-sender-id']);
  }

  /**
   * @description gets the gateway list
   */
  getGatewayList() {
    this.customService.getCustomRouteGateways().subscribe(
      (res: CustomGateway_ApiResponse) => {
        console.log(res);
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
   *
   * @description adds the mobile with senderid custom route
   */
  onSubmit() {
    if (this.selectedFile) {
      this.submitted = false;
      this.onAddRoute(this.selectedFile);
      return;
    }

    if(!this.senderIdFrom.valid){
      this.submitted = true
    } else {
      this.senderIdFrom.value.esmeaddr = this.senderIdFrom.value.esmeaddr
      ? this.senderIdFrom.value.esmeaddr
      : 0;
    this.senderIdFrom.value.comments = this.senderIdFrom.value.comments
      ? this.senderIdFrom.value.comments
      : "";
    this.senderIdFrom.value.req_type = "single_req";
    this.senderIdFrom.value.createdby = "1234";
    this.senderIdFrom.value.whitelist_type = this.control.whitelist_type.value.toLowerCase();
    this.onAddRoute({ ...this.senderIdFrom.value });
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

  // onAddRoute(body) {
  //   const formType = this.selectedFile ? true : false;
  //   this.mobileSenderIdCustomService
  //     .addCustomMobileSenderid(body, formType)
  //     .subscribe(
  //       (data: MobileBlackList_AddResponse) => {
  //         if (data.responsestatus === "failure") {
  //           this.fromReset();
  //           Swal.fire({
  //             icon: 'error',
  //             title: data.responsestatus,
  //             text: `Success:${data.data.success}
  //                    Duplicate:${data.data.duplicate}
  //                    Failed:${data.data.failed}
  //                    Invalid:${data.data.invalid}
  //                    Total:${data.data.total}`
  //           });
  //         } else {
  //           Swal.fire({
  //             icon: 'success',
  //             title: data.responsestatus,
  //             text: `Success:${data.data.success}
  //                    Duplicate:${data.data.duplicate}
  //                    Failed:${data.data.failed}
  //                    Invalid:${data.data.invalid}
  //                    Total:${data.data.total}`
  //           });
  //           this.cancel();
  //         }
  //       },
  //       (error: HttpErrorResponse) => {
  //         errorAlert(error.message, error.statusText);
  //         this.fromReset();
  //       }
  //     );
  // }

  onAddRoute(body) {
    const formType = this.selectedFile ? true : false;
    this.mobileSenderIdCustomService.addCustomMobileSenderid(body, formType).subscribe(
      (res: MobileBlackList_AddResponse) => {
        this.fileResponse = res;
        this.filResponseData = JSON.parse(JSON.stringify(this.fileResponse));
        if(res.responsestatus === 'success'){

          if(this.fileResponse.data.invalid === 0 && this.fileResponse.data.duplicate === 0){
            successAlert(res.responsestatus, res.message)
            this.fromReset()
          } else {
            console.log("2323232323232323")
            this.modalService.open(this.priceListSubmitSuccess)
            this.fromReset()
          }
        }  else if (res.responsestatus === 'failure') {
          if(this.fileResponse.data.invalid === 0 && this.fileResponse.data.duplicate === 0) {
            errorAlert(res.responsestatus, res.message)
            this.fromReset()
          } else {
            console.log("23234234234234234234")
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
    this.senderIdFrom.markAsUntouched();
    this.senderIdFrom.markAsPristine();
    this.selectedFile = null;
    this.cmobilesenderUpload = null;
    this.submitted = false;
    this.emptyForm();
  }

  /**
   * @description resets the form to the default values
   */
  emptyForm() {
    this.senderIdFrom.patchValue({
      mobile: "",
      senderid: "",
      primary_gw_id: null,
      fallback_gw_id: null,
      comments: "",
      esmeaddr: "",
      createdby: "",
    });
  }
}
