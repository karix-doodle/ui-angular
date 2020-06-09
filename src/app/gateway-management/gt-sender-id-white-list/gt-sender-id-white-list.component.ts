import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtSenderIdWhiteList_ApiResponse, GtSenderIdWhiteList_Data, GtSenderIdWhiteListDelete_ApiResponse, GtSenderIdCountryList_ApiResponse, GtSenderIdCountryList_Data, GtAddSenderId_ApiResponse } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gt-sender-id-white-list',
  templateUrl: './gt-sender-id-white-list.component.html',
  styleUrls: ['./gt-sender-id-white-list.component.css']
})
export class GtSenderIdWhiteListComponent implements OnInit {

  GtSenderIdWhiteListRes: GtSenderIdWhiteList_ApiResponse;
  GtSenderIdWhiteList: GtSenderIdWhiteList_Data;

  GtSenderIdCountryListRes: GtSenderIdCountryList_ApiResponse;
  GtSenderIdCountryList: GtSenderIdCountryList_Data;

  addSenderidFormGroup: FormGroup;
  isAddSenderidValid: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
    private formBuilder: FormBuilder,
  ) {

    this.addSenderidFormGroup = this.formBuilder.group({
      country: new FormControl('', [Validators.required]),
      senderid: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });

  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.Gateway_SenderIdWhiteList()
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
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          })
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        })
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
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          })
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        })
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
              Swal.fire({
                icon: 'success',
                title: res.responsestatus,
                text: res.message,
              })
              this.Gateway_SenderIdWhiteList()
            } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              Swal.fire({
                icon: 'error',
                title: res.responsestatus,
                text: res.message,
              })
            }
          }, error => {
            Swal.fire({
              icon: 'error',
              title: error.statusText,
              text: error.message,
            })
          }
        );
      } else {
        this.Gateway_SenderIdWhiteList()
      }
    })
  }

  onSubmitaddSenderid(data) {
    this.isAddSenderidValid = true;
    if (this.addSenderidFormGroup.invalid) {
      return;
    }
    else {
      this.isAddSenderidValid = false;
      let params = {
        req_type: "single_req",
        gw_id: this.activeRoute.snapshot.params.id
      }
      let body = { ...data, ...params }
      this.gatewayManagementService.Gateway_addSenderId(body).subscribe(
        (res: GtAddSenderId_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            Swal.fire({
              icon: 'success',
              title: res.responsestatus,
              text: res.message,
            })
          } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            Swal.fire({
              icon: 'error',
              title: res.responsestatus,
              text: res.message,
            })
          }
        }, (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: error.statusText,
            text: error.message,
          })
        }
      );
    }
  }


}
