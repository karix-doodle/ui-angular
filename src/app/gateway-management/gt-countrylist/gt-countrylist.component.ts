import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetailsCountryList_ApiResponse, GtDetailsCountryList_Data, GtCountryStatusupdate_ApiResponse, GtSenderIdConfigCountryList_ApiResponse, GtSenderIdConfigCountryList_Data, GtSenderIdConfigOperatorList_ApiResponse, GtSenderIdConfigOperatorList_Data, GtExistingSenderId_ApiResponse, GtExistingSenderId_Data, GtAddSenderIdConfiguration_ApiResponse } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { addValidators, removeValidators } from '../../shared/helper/helperFunctions';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';
//import * as SampleJson from "../../../../src/assets/config.json";
import { HttpClient } from "@angular/common/http";



@Component({
  selector: 'app-gt-countrylist',
  templateUrl: './gt-countrylist.component.html',
  styleUrls: ['./gt-countrylist.component.css']
})

export class GtCountrylistComponent implements OnInit {
  sendTestMsg: any[] = [1, 2, 3];
  default_sender_id: string = '';
  currency: string = '';

  GtDetailsCountryListRes: GtDetailsCountryList_ApiResponse;
  GtDetailsCountryList: GtDetailsCountryList_Data;
  GtSenderIdConfigCountryListRes: GtSenderIdConfigCountryList_ApiResponse;
  GtSenderIdConfigCountryList: GtSenderIdConfigCountryList_Data;

  GtSenderIdConfigOperatorListRes: GtSenderIdConfigOperatorList_ApiResponse;
  GtSenderIdConfigOperatorList: GtSenderIdConfigOperatorList_Data;

  GtAddSenderIdConfigurationRes: GtAddSenderIdConfiguration_ApiResponse;

  GtExistingSenderIdRes: GtExistingSenderId_ApiResponse;
  GtExistingSenderIdData: GtExistingSenderId_Data;

  addSenderIdConfigFormGroup: FormGroup;
  isAddsenderIdConfigValid: boolean = false;

  searchvalue: string = ''
  sortingName: string;
  isDesc: boolean;

  GtMgmtAuthControls = null;
  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }
  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gatewayManagementService: GatewayManagementService,
    private authorizationService: AuthorizationService,
    private httpClient: HttpClient
  ) {

    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
    
   

 
  

  }

  close(pop: any) {
    pop.close()
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {

    this.httpClient.get("assets/config.json").subscribe(data =>{
     let response: any = data;
     console.log("http client"+response.default_sender_id);
     this.default_sender_id=response.default_sender_id;
     let default_senderid = this.default_sender_id;
     console.log("default_senderid"+default_senderid);
     this.addSenderIdConfigFormGroup = this.formBuilder.group({
       gw_id: [this.activeRoute.snapshot.params.id],
       country: new FormControl('', [Validators.required]),
       mcc: new FormControl('', [Validators.required]),
       operator: new FormControl('', [Validators.required]),
       mnc: new FormControl('', [Validators.required]),
       senderid_type: new FormControl('', [Validators.required]),
       default_senderid: new FormControl('', [Validators.required, Validators.pattern(default_senderid)]),
     });

     
    });
    this.currency = "Current Rate "+decodeURIComponent(this.activeRoute.snapshot.paramMap.get('currency'));
    
    this.Gateway_CountryList();
    this.GtSenderIdConfigCountry_list()
  }

  toggleRateChange(popover, rlist: any, country: string, operator: string) {
    popover.open({ rlist, country, operator });
  }

  Gateway_CountryList() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.Gateway_CountryList(data).subscribe(
      (res: GtDetailsCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsCountryListRes = res;
          this.GtDetailsCountryList = JSON.parse(JSON.stringify(this.GtDetailsCountryListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  downloadCountryListFile() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.GtCountryListing_download(data).subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'GatewayCountryListdata-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  handleStatus(gid, status, id) {
    let data = {
      gw_id: gid,
      id: id,
      status: status == true ? 0 : 1,
    }
    let statusText = status != true ? 'Activate' : 'Inactivate';
    Swal.fire({
      title: 'Are you sure want to ' + statusText + ' the country?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.gatewayManagementService.GtCountry_statusupdate(data).subscribe(
          (res: GtCountryStatusupdate_ApiResponse) => {
            if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              // successAlert(res.message, res.responsestatus)
            } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              errorAlert(res.message, res.responsestatus)
            }
          }, (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText)
          }
        );
      } else {
        this.Gateway_CountryList();
      }
    })
  }

  GtSenderIdConfigCountry_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      load: 'country',
    }
    this.gatewayManagementService.GtSenderIdConfigCountry_list(data).subscribe(
      (res: GtSenderIdConfigCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderIdConfigCountryListRes = res;
          this.GtSenderIdConfigCountryList = JSON.parse(JSON.stringify(this.GtSenderIdConfigCountryListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  countryOperatorSelect(countryId, operatorID, checkOperator) {
   // let countryValue = countryId ? countryId.split('-')[1] : '';
   // let operatorValue = operatorID ? operatorID.split('-')[1] : '';
  //  countryId = countryId ? countryId.split('-')[0] : '';
  //  operatorID = operatorID ? operatorID.split('-')[0] : '';
  //ID-160 fix
  let countryValue = countryId ? countryId.split('-')[1] : '';
  countryId = countryId ? countryId.split('-')[0] : '';
  let operatorValue =operatorID;
  if(operatorID.charAt(0)=="-")
  {
    operatorID = operatorID ? operatorID.split('-')[1] : '';
    operatorValue = operatorValue ? operatorValue.split('-')[2] : '';

  }
  else
  {
    operatorID = operatorID ? operatorID.split('-')[0] : '';
    operatorValue = operatorValue ? operatorValue.split('-')[1] : '';
  }

    this.addSenderIdConfigFormGroup.patchValue({
      senderid_type: '',
      default_senderid: ''
    })
    if (checkOperator) {
      this.addSenderIdConfigFormGroup.patchValue({
        operator: '',
        mnc: '',
      })
      if (countryId != "") {
        this.addSenderIdConfigFormGroup.patchValue({
          mcc: countryId,
          country: countryValue,
        })
        this.GtSenderIdConfigOperator_list(countryId)
      } else {
        this.addSenderIdConfigFormGroup.patchValue({
          mcc: '',
          country: '',
        })
        let res: GtSenderIdConfigOperatorList_ApiResponse = null
        this.GtSenderIdConfigOperatorListRes = res;
        this.GtSenderIdConfigOperatorList = JSON.parse(JSON.stringify(this.GtSenderIdConfigOperatorListRes));
      }
    } else {
      if (operatorID != "") {
        let data = {
          gw_id: this.activeRoute.snapshot.params.id,
          mcc: countryId,
          mnc: operatorID,
        }
        this.addSenderIdConfigFormGroup.patchValue({
          mnc: operatorID,
          operator: operatorValue
        })
        this.GtExistingSenderId(data);
      } else {
        this.addSenderIdConfigFormGroup.patchValue({
          mnc: '',
          operator: ''
        })
      }
    }
  }

  GtExistingSenderId(data) {
    this.gatewayManagementService.GtExistingSenderId(data).subscribe(
      (res: GtExistingSenderId_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtExistingSenderIdRes = res;
          this.GtExistingSenderIdData = JSON.parse(JSON.stringify(this.GtExistingSenderIdRes));
          if (this.GtExistingSenderIdData.data.hasdata) {
            this.addSenderIdConfigFormGroup.patchValue({
              senderid_type: this.GtExistingSenderIdData.data.senderids.senderid_type,
              default_senderid: this.GtExistingSenderIdData.data.senderids.default_senderid
            })
          }
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtSenderIdConfigOperator_list(mccValue) {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      load: 'operator',
      mcc: mccValue
    }
    this.gatewayManagementService.GtSenderIdConfigOperator_list(data).subscribe(
      (res: GtSenderIdConfigOperatorList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderIdConfigOperatorListRes = res;
          this.GtSenderIdConfigOperatorList = JSON.parse(JSON.stringify(this.GtSenderIdConfigOperatorListRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
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

  onSubmitSenderIdConfig(data) {
    this.isAddsenderIdConfigValid = true;
    if (this.addSenderIdConfigFormGroup.invalid) {
      return;
    }
    else {
      this.isAddsenderIdConfigValid = false;
      this.gatewayManagementService.GtAddSenderIdConfiguration(data).subscribe(
        (res: GtAddSenderIdConfiguration_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            successAlert(res.message, res.responsestatus)
            this.resetSenderIdForm()
            this.Gateway_CountryList();
          } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            errorAlert(res.message, res.responsestatus)
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText)
        }
      );
    }
  }

  resetSenderIdForm() {
    this.modalService.dismissAll('senderidConfig');
    this.addSenderIdConfigFormGroup.patchValue({
      country: '',
      mcc: '',
      operator: '',
      senderid_type: '',
      default_senderid: '',
    });
  }

}
