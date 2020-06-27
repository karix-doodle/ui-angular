import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtTimeZone_ApiResponse, GtTimeZone_Data, GtCurrency_ApiResponse, GtCurrency_Data, GtCreate_ApiResponse } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-create-gateway',
  templateUrl: './create-gateway.component.html',
  styleUrls: ['./create-gateway.component.css']
})
export class CreateGatewayComponent implements OnInit {

  gatewayTimeZoneDataRes: GtTimeZone_ApiResponse;
  gatewayTimeZoneData: GtTimeZone_Data;
  gatewayCurrencyDataRes: GtCurrency_ApiResponse;
  gatewayCurrencyData: GtCurrency_Data;

  createGatewayFormGroup: FormGroup;
  isCreateValid: boolean = false;
  currency_id = environment.currencyDefault;

  GtMgmtAuthControls = null

  messageType = [{ item: "Transaction", value: 0 }, { item: "Promotion", value: 1 }, { item: "Transscrub", value: 3 }]
  charsetType = [{ item: "ASCII" }, { item: "ISO" }, { item: "GSM" }]

  constructor(
    private gatewayManagementService: GatewayManagementService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService
  ) {
    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
    console.log(this.GtMgmtAuthControls, 'adadasdas')

    let gw_name = '[0-9a-zA-Z-_.@$\' ]{4,200}';
    let gw_id = '[0-9a-zA-Z]{2,10}';
    let tps = '[0-9]{1,100000}';
    let description = '^[0-9a-zA-Z !@#$%^&*()_+-=:;"<>/?{}\'.,/\n/\r/\t/\s]{1,1000}$';
    this.createGatewayFormGroup = this.formBuilder.group({
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
    const msgTypeFormArray = <FormArray>this.createGatewayFormGroup.controls.msg_type;
    if (isChecked) {
      msgTypeFormArray.push(new FormControl(messageType));
    } else {
      let index = msgTypeFormArray.controls.findIndex(x => x.value == messageType)
      msgTypeFormArray.removeAt(index);
    }
  }

  getCharsetType(charsetType: string, isChecked: boolean) {
    const charsetTypeFormArray = <FormArray>this.createGatewayFormGroup.controls.charset_enc;
    if (isChecked) {
      charsetTypeFormArray.push(new FormControl(charsetType));
    } else {
      let index = charsetTypeFormArray.controls.findIndex(x => x.value == charsetType)
      charsetTypeFormArray.removeAt(index);
    }
  }

  onSubmitCreateGateway(data) {
    this.isCreateValid = true;
    // for (let el in this.createGatewayFormGroup.controls) {
    //   if (this.createGatewayFormGroup.controls[el].errors) {
    //     console.log(el, 'asdasd')
    //   }
    // }
    if (this.createGatewayFormGroup.invalid) {
      return;
    }
    else {
      this.isCreateValid = false;
      data.currency_id = (Number)(data.currency_id)
      data.timezone = (Number)(data.timezone)
      data.is_bill_on_submission = data.is_bill_on_submission ? 1 : 0;
      data.exclude_lcr = data.exclude_lcr ? "1" : "0";
      data.senderid_whitelist_required = data.senderid_whitelist_required ? "1" : "0";
      data.senderid_type = (Number)(data.senderid_type);
      data.msg_type = (data.msg_type.toString());
      data.charset_enc = (data.charset_enc.toString());
      this.gatewayManagementService.Gateway_create(data).subscribe(
        (res: GtCreate_ApiResponse) => {
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
