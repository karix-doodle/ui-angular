import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import {
  BlackListGateway_Data,
  BlackListGateway_ApiResponse,
  MobileBlackList_AddResponse,
  MobileBlackList_AddData,
} from "src/app/route-management/models/BlackList/blacklist.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BlackListService } from "src/app/route-management/services/RouteManagement/blacklist/black-list.service";
import { BlackListAddMobileSenderidService } from "src/app/route-management/services/RouteManagement/blacklist/black-list-add-mobile-senderid.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { blacklistAccountType, templatePattern, senderidPattern, esmeddrPattern } from 'src/app/shared/helper/globalVariables';

@Component({
  selector: "app-bl-senderid-route",
  templateUrl: "./bl-senderid-route.component.html",
  styleUrls: ["./bl-senderid-route.component.css"],
})
export class BlSenderidRouteComponent implements OnInit {
  accounts: string[] = blacklistAccountType
  submitted = false;
  gatewayList: BlackListGateway_Data;
  gatewayListApiResponse: BlackListGateway_ApiResponse;
  fileData: FormData = null;
  blmobileUpload: any;
  blacklistSenderTemplateAddForm: FormGroup;
  fileResponse: MobileBlackList_AddResponse
filResponseData: MobileBlackList_AddData
@ViewChild('priceListSubmitSuccess', { static: true })
  priceListSubmitSuccess: TemplateRef<any>;
  constructor(
    public blackListService: BlackListService,
    public Service: BlackListAddMobileSenderidService,
    public router: Router,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public authService: AuthorizationService
  ) {}

  ngOnInit() {
    this.getAllGateways();
    this.intForm();
  }
  /**
   *
   * @description initialize the form
   */

  private intForm() {
    this.blacklistSenderTemplateAddForm = this.formBuilder.group({
      blacklist_type: ["Global", [Validators.required]],
      template: [
        "",
        [Validators.required, Validators.pattern(templatePattern)],
      ],
      senderid: [
        "",
        [Validators.required, Validators.pattern(senderidPattern)],
      ],
      esmeaddr: [""],
      gw_id: [null],
    });
  }
  /**
   * @description validations added acording to the blacklist_type
   */

  onChange() {
    switch (this.control.blacklist_type.value) {
      case "Gateway": {
        this.control.gw_id.setValidators([Validators.required]);
        this.control.esmeaddr.setValidators(null);
        this.control.esmeaddr.setErrors(null);
        this.fromReset();
        break;
      }
      case "Account": {
        this.control.gw_id.setValidators(null);
        this.control.gw_id.setErrors(null);
        this.control.esmeaddr.setValidators([
          Validators.required,
          Validators.pattern(esmeddrPattern),
        ]);
        this.fromReset();
        break;
      }

      default: {
        this.control.esmeaddr.setValidators(null);
        this.control.esmeaddr.setErrors(null);
        this.control.gw_id.setValidators(null);
        this.control.gw_id.setErrors(null);
        this.fromReset();
      }
    }
  }

  get control() {
    return this.blacklistSenderTemplateAddForm.controls;
  }

  /**
   * @description navigates back to list page
   */
  cancel() {
    this.router.navigateByUrl("/route-management/blacklist/sender-id");
  }

  /**
   * @description gets the gateway list
   */
  getAllGateways() {
    this.blackListService.getBlackListGatewayList().subscribe(
      (res: BlackListGateway_ApiResponse) => {
        // console.log(res.data);
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.gatewayListApiResponse = res;
          this.gatewayList = JSON.parse(
            JSON.stringify(this.gatewayListApiResponse.data)
          );
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus);
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.name, error.statusText);
      }
    );
  }
/**
   *
   * @description adds the blacklist with senderid
   */
  onSubmit() {
    if (this.fileData) {
      this.submitted = false;
      this.onAddRoute(this.fileData);
    } else if (!this.blacklistSenderTemplateAddForm.valid) {
      this.submitted = true;
    } else {
      this.blacklistSenderTemplateAddForm.value.req_type = "single_req";
      this.onAddRoute({ ...this.blacklistSenderTemplateAddForm.value });
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
    const file: File = fileInput.target.files[0];
    const formData: any = new FormData();
    this.blmobileUpload = file.name;
    formData.append("file", file);
    formData.append("req_type", "fileupload");
    formData.append(
      "blacklist_type",
      this.blacklistSenderTemplateAddForm.value.blacklist_type.toLowerCase()
    );
    formData.append("loggedinempid", +this.authService.authorizationState.loggedinempid);
    this.fileData = formData;
  }
  /**
   *
   * @param body contains the addroute data
   * @description checks wheather the formtype is form or fomdata
   */

  // onAddRoute(body) {
  //   const formType = this.fileData ? true : false;
  //   this.Service.addBlSender(body, formType).subscribe(
  //     (data: MobileBlackList_AddResponse) => {
  //       if (data.responsestatus === "failure") {
  //         this.fromReset();
  //         Swal.fire({
  //           icon: 'error',
  //           title: data.responsestatus,
  //           text: `Success:${data.data.success}
  //                  Duplicate:${data.data.duplicate}
  //                  Failed:${data.data.failed}
  //                  Invalid:${data.data.invalid}
  //                  Total:${data.data.total}`
  //         });
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
  //       errorAlert(error.name, error.statusText);
  //       this.fromReset();
  //     }
  //   );
  // }

  onAddRoute(body) {
    const formType = this.fileData ? true : false;
    this.Service.addBlSender(body, formType).subscribe(
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
    this.blacklistSenderTemplateAddForm.markAsUntouched();
    this.blacklistSenderTemplateAddForm.markAsPristine();
    this.fileData = null;
    this.blmobileUpload = null;
    this.submitted = false;
    this.emtyForm();
  }
   /**
   * @description empty the form to the default values
   */

  emtyForm() {
    this.blacklistSenderTemplateAddForm.patchValue({
      template: "",
      senderid: "",
      esmeaddr: "",
      gw_id: null,
    });
  }
}
