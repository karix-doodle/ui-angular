import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../services/settings.service';
import {
  SettingsTimeZone_ApiResponse,
  SettingsTimeZone_Data,
  SettingsCurrency_ApiResponse,
  SettingsCurrency_Data,
  GsUserupdate_ApiResponse,
  GsInvoiceconversion_ApiResponse,
  GsInvoiceconversion_Data
} from '../models/settings.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css']
})

export class SettingsHomeComponent implements OnInit {

  invoiceFormGroup: FormGroup;

  settingsTimeZoneDataRes: SettingsTimeZone_ApiResponse;
  settingsTimeZoneData: SettingsTimeZone_Data;
  settingsCurrencyDataRes: SettingsCurrency_ApiResponse;
  settingsCurrencyData: SettingsCurrency_Data;
  settingsInvoiceconversionRes: GsInvoiceconversion_ApiResponse;
  settingsInvoiceconversionData: GsInvoiceconversion_Data;

  currencyTimezoneFormGroup: FormGroup;
  isCurrencyTimeZoneValid: boolean = false;

  StMgmtAuthControls = null

  constructor(
    config: NgbModalConfig,
    private settingsService: SettingsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService
  ) {
    this.StMgmtAuthControls = authorizationService.authorizationState.settings

    this.currencyTimezoneFormGroup = this.formBuilder.group({
      currency_id: new FormControl(''),
      timezone_id: new FormControl(''),
    });
  }

  open(content) {
    // this.modalService.open(content);
    this.modalService.open(content, { windowClass: "viewAudit" });
  }

  ngOnInit() {
    this.invoiceFormGroup = this.formBuilder.group({
      currency_list: this.formBuilder.array([this.createCurrencyItem()]),
    });

    this.functionInitialServices(() => {
      this.Globalsetting_users()
      this.GsInvoiceconversion_view()
    })
  }

  createCurrencyItem(): FormGroup {
    return this.formBuilder.group({
      fromcurrencyid: [''],
      tocurrencyid: [''],
      rate: [''],
      status: ['']
    });
  }

  functionInitialServices(callBackFunction) {
    this.Globalsetting_timezone();
    this.Globalsetting_currency();
    callBackFunction();
  }

  Globalsetting_timezone() {
    this.settingsService.Globalsetting_timezone().subscribe(
      (res: SettingsTimeZone_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.settingsTimeZoneDataRes = res;
          this.settingsTimeZoneData = JSON.parse(JSON.stringify(this.settingsTimeZoneDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  Globalsetting_currency() {
    this.settingsService.Globalsetting_currency().subscribe(
      (res: SettingsCurrency_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.settingsCurrencyDataRes = res;
          this.settingsCurrencyData = JSON.parse(JSON.stringify(this.settingsCurrencyDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  Globalsetting_users() {
    this.settingsService.Globalsetting_users().subscribe(
      (res: any) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.currencyTimezoneFormGroup.patchValue({
            currency_id: res.data.currency_id,
            timezone_id: res.data.timezone_id
          })
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  currencyListFormArray(): FormArray {
    return <FormArray>this.invoiceFormGroup.controls['currency_list'];
  }

  addToCurrencyList(): void {
    const currencyListControl = this.currencyListFormArray();
    currencyListControl.push(this.createCurrencyItem());
  }

  GsInvoiceconversion_view() {
    this.settingsService.GsInvoiceconversion_view().subscribe(
      (res: any) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.settingsInvoiceconversionRes = res;
          this.settingsInvoiceconversionData = JSON.parse(JSON.stringify(this.settingsInvoiceconversionRes));
          const currencyListControl = this.currencyListFormArray();
          [...Array(this.settingsInvoiceconversionData.data.conversiondetails.length - 1)].map(() => {
            this.addToCurrencyList();
          });
          console.log(currencyListControl.value, this.settingsInvoiceconversionData.data.conversiondetails, 'asdasd')
          currencyListControl.value(this.settingsInvoiceconversionData.data.conversiondetails)
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  onSubmitCurrencyTimezoneFormGroup(data) {
    this.isCurrencyTimeZoneValid = true;
    if (this.currencyTimezoneFormGroup.invalid) {
      return;
    }
    else {
      this.isCurrencyTimeZoneValid = false;
      this.settingsService.Globalsetting_update(data).subscribe(
        (res: GsUserupdate_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            successAlert(res.message, res.responsestatus)
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
