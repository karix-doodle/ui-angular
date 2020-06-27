import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtEdit_ApiResponse, GtEdit_Data, GtTimeZone_ApiResponse, GtTimeZone_Data, GtCurrency_ApiResponse, GtCurrency_Data, GtUpdate_ApiResponse } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { toCamelCase } from '../../shared/helper/helperFunctions';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-edit-gateway',
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.css']
})
export class EditGatewayComponent implements OnInit {

  gatewayUpdateDataRes: GtUpdate_ApiResponse;
  gatewayEditDataRes: GtEdit_ApiResponse;
  gatewayEditData: GtEdit_Data;

  gatewayTimeZoneDataRes: GtTimeZone_ApiResponse;
  gatewayTimeZoneData: GtTimeZone_Data;
  gatewayCurrencyDataRes: GtCurrency_ApiResponse;
  gatewayCurrencyData: GtCurrency_Data;

  updateGatewayFormGroup: FormGroup;
  isUpdateValid: boolean = false;

  GtMgmtAuthControls = null

  public messageType = [
    { item: "Transaction", value: 0, status: 0 },
    { item: "Promotion", value: 1, status: 0 },
    { item: "Transscrub", value: 3, status: 0 }
  ]
  public charsetType = [
    { item: "ASCII", status: 0 },
    { item: "ISO", status: 0 },
    { item: "GSM", status: 0 }
  ]

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private gatewayManagementService: GatewayManagementService,
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService
  ) {
    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
    console.log(this.GtMgmtAuthControls, 'adadasdas')

    let gw_name = '[0-9a-zA-Z-_.@$\' ]{4,200}';
    let gw_id = '[0-9a-zA-Z]{2,10}';
    let tps = '[0-9]{1,100000}';
    let description = '^[0-9a-zA-Z !@#$%^&*()_+-=:;"<>/?{}\'.,/\n/\r/\t/\s]{1,1000}$';
    this.updateGatewayFormGroup = this.formBuilder.group({
      gw_name: new FormControl('', [Validators.required, Validators.pattern(gw_name)]),
      gw_id: new FormControl('', [Validators.required, Validators.pattern(gw_id)]),
      currency_id: new FormControl('', [Validators.required]),
      timezone: new FormControl('', [Validators.required]),
      gw_type: new FormControl('', [Validators.required]),
      billing_type: new FormControl('', [Validators.required]),
      msg_type: this.formBuilder.array([], [Validators.required]),
      is_bill_on_submission: new FormControl(false),
      exclude_lcr: new FormControl(false),
      tps: new FormControl('', [Validators.pattern(tps)]),
      dlr_type: new FormControl('', [Validators.required]),
      charset_enc: this.formBuilder.array([], [Validators.required]),
      senderid_whitelist_required: new FormControl(true),
      senderid_type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.pattern(description)]),
    });
  }

  ngOnInit() {
    this.Gateway_timezone();
    this.Gateway_currency();
    this.Gateway_Edit();
  }

  Gateway_timezone() {
    this.gatewayManagementService.Gateway_timezone().subscribe(
      (res: GtTimeZone_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayTimeZoneDataRes = res;
          this.gatewayTimeZoneData = JSON.parse(JSON.stringify(this.gatewayTimeZoneDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  Gateway_currency() {
    this.gatewayManagementService.Gateway_currency().subscribe(
      (res: GtCurrency_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayCurrencyDataRes = res;
          this.gatewayCurrencyData = JSON.parse(JSON.stringify(this.gatewayCurrencyDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  getMessageType(messageType: string, isChecked: boolean) {
    const msgTypeFormArray = <FormArray>this.updateGatewayFormGroup.controls.msg_type;
    if (isChecked) {
      msgTypeFormArray.push(new FormControl(messageType));
    } else {
      let index = msgTypeFormArray.controls.findIndex(x => x.value == messageType)
      msgTypeFormArray.removeAt(index);
    }
  }

  setMessageType(types) {
    let messageType = this.messageType
    const msgTypeFormArray = <FormArray>this.updateGatewayFormGroup.controls.msg_type;
    types.forEach(function (value, key) {
      msgTypeFormArray.push(new FormControl(Number(value)));
      messageType.forEach(function (tvalue, key) {
        if (value == tvalue.value) {
          messageType[key].status = 1
        }
      });
    });
  }

  getCharsetType(charsetType: string, isChecked: boolean) {
    const charsetTypeFormArray = <FormArray>this.updateGatewayFormGroup.controls.charset_enc;
    if (isChecked) {
      charsetTypeFormArray.push(new FormControl(charsetType));
    } else {
      let index = charsetTypeFormArray.controls.findIndex(x => x.value == charsetType)
      charsetTypeFormArray.removeAt(index);
    }
  }

  setCharsetType(types: any) {
    let charsetType = this.charsetType
    const charsetTypeFormArray = <FormArray>this.updateGatewayFormGroup.controls.charset_enc;
    types.forEach(function (value, key) {
      charsetTypeFormArray.push(new FormControl(value));
      charsetType.forEach(function (tvalue, key) {
        if (value == tvalue.item) {
          charsetType[key].status = 1
        }
      });
    });
  }

  Gateway_Edit() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
    }
    this.gatewayManagementService.Gateway_Edit(data).subscribe(
      (res: GtEdit_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayEditDataRes = res;
          this.gatewayEditData = JSON.parse(JSON.stringify(this.gatewayEditDataRes));
          this.updateGatewayFormGroup.patchValue({
            gw_name: this.gatewayEditDataRes.data.gw_name,
            gw_id: this.gatewayEditDataRes.data.gw_id,
            currency_id: this.gatewayEditDataRes.data.currency_id,
            timezone: this.gatewayEditDataRes.data.timezone,
            gw_type: this.gatewayEditDataRes.data.gw_type,
            billing_type: this.gatewayEditDataRes.data.billing_type.toLowerCase(),
            is_bill_on_submission: this.gatewayEditDataRes.data.is_bill_on_submission,
            exclude_lcr: this.gatewayEditDataRes.data.exclude_lcr,
            tps: this.gatewayEditDataRes.data.tps,
            dlr_type: this.gatewayEditDataRes.data.dlr_type,
            senderid_whitelist_required: this.gatewayEditDataRes.data.senderid_whitelist_required,
            senderid_type: this.gatewayEditDataRes.data.senderid_type,
            description: this.gatewayEditDataRes.data.description,
          });
          this.setMessageType(this.gatewayEditDataRes.data.msg_type.split(','))
          this.setCharsetType(this.gatewayEditDataRes.data.charset_enc.split(','))
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  onSubmitUpdateGateway(data) {
    this.isUpdateValid = true;
    if (this.updateGatewayFormGroup.invalid) {
      return;
    }
    else {
      this.isUpdateValid = false;
      data.currency_id = (Number)(data.currency_id)
      data.timezone = (Number)(data.timezone)
      data.billing_type = toCamelCase(data.billing_type);
      data.is_bill_on_submission = data.is_bill_on_submission ? 1 : 0;
      data.exclude_lcr = data.exclude_lcr ? "1" : "0";
      data.senderid_whitelist_required = data.senderid_whitelist_required ? "1" : "0";
      data.senderid_type = (Number)(data.senderid_type);
      data.msg_type = (data.msg_type.toString());
      data.charset_enc = (data.charset_enc.toString());
      this.gatewayManagementService.Gateway_update(data).subscribe(
        (res: GtUpdate_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            successAlert(res.message, res.responsestatus)
            this.router.navigate(['gateway-management']);
          } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            errorAlert(res.message, res.responsestatus)
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText)
        }
      );
    }
  }

}
