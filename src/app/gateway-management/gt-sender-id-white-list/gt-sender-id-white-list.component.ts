import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtSenderIdWhiteList_ApiResponse, GtSenderIdWhiteList_Data, GtSenderIdWhiteListDelete_ApiResponse, GtSenderIdCountryList_ApiResponse, GtAddSenderId_ApiResponse } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { addValidators, removeValidators } from '../../shared/helper/helperFunctions';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-gt-sender-id-white-list',
  templateUrl: './gt-sender-id-white-list.component.html',
  styleUrls: ['./gt-sender-id-white-list.component.css']
})
export class GtSenderIdWhiteListComponent implements OnInit {

  GtSenderIdWhiteListRes: GtSenderIdWhiteList_ApiResponse;
  GtSenderIdWhiteList: GtSenderIdWhiteList_Data;

  GtSenderIdCountryListRes: GtSenderIdCountryList_ApiResponse;
  GtSenderIdCountryList: any

  addSenderidFormGroup: FormGroup;
  isAddSenderidValid: boolean = false;
  sortingName: string;
  isDesc: boolean;
  searchvalue: string = ''

  fileData: FormData = null;

  GtMgmtAuthControls = null

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService
  ) {

    this.GtMgmtAuthControls = this.authorizationService.authorizationState.gw_mgmt;

    this.addSenderidFormGroup = this.formBuilder.group({
      country: ['', [Validators.required]],
      senderid: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });

  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.Gateway_SenderIdWhiteList()
    this.GtSenderIdCountry_List()
  }

  Gateway_SenderIdWhiteList() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.Gateway_SenderIdWhiteList(data).subscribe(
      (res: GtSenderIdWhiteList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderIdWhiteListRes = res;
          this.GtSenderIdWhiteList = JSON.parse(JSON.stringify(this.GtSenderIdWhiteListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtSenderIdCountry_List() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
    }
    this.gatewayManagementService.GtSenderIdCountry_List(data).subscribe(
      (res: GtSenderIdCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderIdCountryListRes = res;
          this.GtSenderIdCountryList = JSON.parse(JSON.stringify(this.GtSenderIdCountryListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  handleDelete(gid, id) {
    let data = {
      gw_id: gid,
      id: id,
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.gatewayManagementService.Gateway_SenderIdWhiteListDelete(data).subscribe(
          (res: GtSenderIdWhiteListDelete_ApiResponse) => {
            if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              successAlert(res.message, res.responsestatus)
              this.Gateway_SenderIdWhiteList()
            } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              errorAlert(res.message, res.responsestatus)
            }
          }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText)
          }
        );
      } else {
        this.Gateway_SenderIdWhiteList()
      }
    })
  }

  isFieldValid(field: string) {
    return this.addSenderidFormGroup.get(field).value;
  }

  fileUpload(files) {
    if (files.length === 0) {
      return;
    }

    removeValidators(this.addSenderidFormGroup, 'country')
    removeValidators(this.addSenderidFormGroup, 'senderid')

    const file = files.item(0);
    const formData: FormData = new FormData();
    this.addSenderidFormGroup.patchValue({
      file: file.name
    })
    formData.append("req_type", "fileupload");
    formData.append("gw_id", this.activeRoute.snapshot.params.id);
    formData.append("file", file, file.name);
    formData.append("loggedinempid", String(this.authorizationService.authorizationState.loggedinempid));
    this.fileData = formData;
  }

  removeSenderIdFile() {
    this.addSenderidFormGroup.patchValue({
      file: ""
    })
    this.fileData = null
  }

  onSubmitaddSenderid(data) {
    this.isAddSenderidValid = true;
    if (this.isFieldValid('country') != "" && this.isFieldValid('senderid') == "" ||
      this.isFieldValid('country') == "" && this.isFieldValid('senderid') != "") {
      removeValidators(this.addSenderidFormGroup, 'file')
    } else {
      addValidators(this.addSenderidFormGroup, 'country')
      addValidators(this.addSenderidFormGroup, 'senderid')
      addValidators(this.addSenderidFormGroup, 'file')
    }

    if (this.isFieldValid('file') != "") {

      this.isAddSenderidValid = false;
      this.addSenderIdServiceCall(this.fileData, true)

    } else if (this.isFieldValid('country') != "" && this.isFieldValid('senderid') != "") {

      this.isAddSenderidValid = false;

      let params = {
        req_type: "single_req",
        gw_id: this.activeRoute.snapshot.params.id
      }

      delete data.file
      let body = { ...data, ...params }

      this.addSenderIdServiceCall(body, false)

    } else {
      return;
    }
  }

  addSenderIdServiceCall(data, type) {
    this.gatewayManagementService.Gateway_addSenderId(data, type).subscribe(
      (res: GtAddSenderId_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {

          successAlert(res.message, res.responsestatus)
          this.resetSenderIdForm()

        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  resetSenderIdForm() {
    removeValidators(this.addSenderidFormGroup, 'country')
    removeValidators(this.addSenderidFormGroup, 'senderid')
    removeValidators(this.addSenderidFormGroup, 'file')
    this.Gateway_SenderIdWhiteList()
    this.modalService.dismissAll('senderIdModal');
    this.addSenderidFormGroup.setValue({
      country: '',
      senderid: '',
      file: ''
    });
  }

  /**
   *
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }


}
