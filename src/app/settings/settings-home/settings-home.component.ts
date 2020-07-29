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
  GsInvoiceconversion_Data,
  GsConversionAdd_ApiResponse,
  GsConversionAdd_Data,
  GsConversionView_ApiResponse,
  GsConversionView_Data
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
  settingsConversionRateRes: GsConversionAdd_ApiResponse;
  settingsConversionRateData: GsConversionAdd_Data;
  settingsConversionViewRes: GsConversionView_ApiResponse;
  settingsConversionViewData: GsConversionView_Data;

  currencyTimezoneFormGroup: FormGroup;
  isCurrencyTimeZoneValid: boolean = false;
  isConversionRateValid: boolean = false;

  StMgmtAuthControls = null

  currencyObj: object = {}

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
    this.initInvoiceForm()

    this.functionInitialServices(() => {
      this.Globalsetting_users()
      this.GsInvoiceconversion_view()
      this.GsConversionRate_view();
    })
  }

  initInvoiceForm() {
    this.invoiceFormGroup = this.formBuilder.group({
      invoiceBillplan: ['manual'],
      currency_list: this.formBuilder.array([this.createCurrencyItem()]),
    });
  }

  createCurrencyItem(): FormGroup {
    return this.formBuilder.group({
      fromcurrencyid: ['', [Validators.required]],
      tocurrencyid: ['', [Validators.required]],
      rate: ['', [Validators.required, Validators.pattern('^[1-9]{1}$|^[0-9]{2,10}$|^[0-9]{1}([\.][0-9]{1,6})$|^[0-9]{2,4}([\.][0-9]{1,6})?$')]],
      status: ['add']
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
          this.setCurrencyObj(this.settingsCurrencyData.data)
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  setCurrencyObj(value) {

    value.map((items) => {
      this.currencyObj[items.currency_id] = [];

      let currencyArray = []

      value.map((item) => {
        if (item.currency_id == items.currency_id) {
          currencyArray.push({
            'currency_id': item.currency_id,
            'currency_name': item.currency_name,
            'currency_symbol': item.currency_symbol,
            'isSelected': true
          })
        } else {
          currencyArray.push({
            'currency_id': item.currency_id,
            'currency_name': item.currency_name,
            'currency_symbol': item.currency_symbol,
            'isSelected': false
          })
        }
      })
      this.currencyObj[items.currency_id] = currencyArray;
    })
  }

  updateCurrencyObj(value) {
    setTimeout(() => {
      value.forEach((items) => {
        if (items.tocurrencyid != '') {
          this.currencyObj[items.fromcurrencyid].filter((item) => {
            if (items.tocurrencyid == item.currency_id) {
              item.isSelected = true
            }
          })
        }
      })
    }, 100)
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

  addToCurrencyList(value: boolean): void {
    const currencyListControl = this.currencyListFormArray();
    this.isConversionRateValid = true;
    if (currencyListControl.valid || value) {
      this.isConversionRateValid = false;
      currencyListControl.push(this.createCurrencyItem());
      if (this.invoiceFormGroup.value['invoiceBillplan'] == 'auto') {
        const currencyListControl = this.currencyListFormArray();
        [...Array(currencyListControl.value.length)].map((item, index) => {
          currencyListControl.at(index).get('rate').clearValidators();
          currencyListControl.at(index).get('rate').updateValueAndValidity();
        });
      }
    }
  }

  removeFromCurrencyRow(indexCurrency) {
    const currencyListControl = this.currencyListFormArray();
    this.currencyObj[currencyListControl.at(indexCurrency).value['fromcurrencyid']].map((item) => {
      if (item.currency_id == currencyListControl.at(indexCurrency).value['tocurrencyid']) {
        item.isSelected = false
      }
    })
    if (currencyListControl.at(indexCurrency).value['status'] == 'view') {
      currencyListControl.at(indexCurrency).patchValue({
        status: 'delete'
      })
    } else if (currencyListControl.at(indexCurrency).value['status'] == 'add') {
      currencyListControl.removeAt(indexCurrency)
    }
  }

  changeType(event) {
    if (event == 'auto') {
      this.GsInvoiceconversion_viewAuto();
    } else {
      this.GsInvoiceconversion_view();
    }
  }

  checkRate(data: Number, form: FormGroup, key: string) {

    let hasDot = data.toString().split('.')
    let ConversionRate = data.toString();

    if (hasDot.length == 2) {
      if (RegExp('^[0]+$').test(hasDot[0])) {
        ConversionRate = Number('0' + '.' + hasDot[0]).toString().replace(/^0+/, '') + Number('0' + '.' + hasDot[1]).toString().replace(/^0+/, '');
      } else {
        ConversionRate = hasDot[0] + Number('0' + '.' + hasDot[1]).toString().replace(/^0+/, '');
      }
    } else if (hasDot.length == 1) {
      if (RegExp('^[0]+$').test(hasDot[0])) {
        ConversionRate = '0'
      }
    }

    let dotIndex = ConversionRate.indexOf('.')

    if (dotIndex == 0) {
      ConversionRate = '0' + ConversionRate
    }

    ConversionRate = ConversionRate != '' ? ConversionRate : '0'

    if (form != undefined) {
      let obj = {}
      obj[key] = ConversionRate
      form.patchValue(obj)
    }

    return ConversionRate;
  }

  handleInvoiceCurrencyChange(key, from, index, event) {
    const currencyListControl = this.currencyListFormArray();

    if (key == 'tocurrencyid') {
      this.currencyObj[from].filter((item) => {
        if (item.currency_id == event.target.value) {
          item.isSelected = true
        }
      })
    }

    if (key == 'fromcurrencyid') {
      if (currencyListControl.at(index).value['tocurrencyid'] != "") {
        this.currencyObj[from].filter((item) => {
          if (item.currency_id == currencyListControl.at(index).value['tocurrencyid']) {
            item.isSelected = false
          }
        })
      }
      currencyListControl.at(index).patchValue({
        tocurrencyid: ''
      })
    }

    let obj = {}
    obj[key] = event.target.value != null ? event.target.value : '';
    currencyListControl.at(index).patchValue(obj)

    if (this.invoiceFormGroup.value['invoiceBillplan'] == 'auto') {
      [...Array(currencyListControl.value.length)].map((item, index) => {
        currencyListControl.at(index).get('rate').clearValidators();
        currencyListControl.at(index).get('rate').updateValueAndValidity();
      });
      this.isConversionRateValid = true;
      if (this.invoiceFormGroup.invalid) {
        return;
      }
      else {
        this.isConversionRateValid = false;
        this.GsInvoiceconversion_viewAuto()
      }
    }
  }

  GsInvoiceconversion_viewAuto() {
    let body = { ...this.invoiceFormGroup.value }
    delete body.invoiceBillplan
    body.currency_list.forEach((item) => {
      delete item.rate
    })
    this.settingsService.GsInvoiceconversion_viewAuto(body).subscribe(
      (res: any) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.settingsInvoiceconversionRes = res;
          this.settingsInvoiceconversionData = JSON.parse(JSON.stringify(this.settingsInvoiceconversionRes));
          this.initInvoiceForm();
          this.invoiceFormGroup.patchValue({
            invoiceBillplan: 'auto',
          });
          [...Array(this.settingsInvoiceconversionData.data.conversiondetails.length - 1)].map(() => {
            this.addToCurrencyList(true);
          });
          const currencyListControl = this.currencyListFormArray();
          this.updateCurrencyObj(this.settingsInvoiceconversionData.data.conversiondetails)
          currencyListControl.patchValue(this.settingsInvoiceconversionData.data.conversiondetails);
          [...Array(currencyListControl.value.length)].map((item, index) => {
            currencyListControl.at(index).get('rate').clearValidators();
            currencyListControl.at(index).get('rate').updateValueAndValidity();
          });
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
          this.invoiceFormGroup.patchValue({
            invoiceBillplan: 'manual',
          });
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GsInvoiceconversion_view() {
    this.settingsService.GsInvoiceconversion_view().subscribe(
      (res: GsInvoiceconversion_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.settingsInvoiceconversionRes = res;
          this.settingsInvoiceconversionData = JSON.parse(JSON.stringify(this.settingsInvoiceconversionRes));
          this.initInvoiceForm();
          [...Array(this.settingsInvoiceconversionData.data.conversiondetails.length - 1)].map(() => {
            this.addToCurrencyList(true);
          });
          const currencyListControl = this.currencyListFormArray();
          this.updateCurrencyObj(this.settingsInvoiceconversionData.data.conversiondetails)
          currencyListControl.patchValue(this.settingsInvoiceconversionData.data.conversiondetails)
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GsConversionRate_view() {
    this.settingsService.GsConversionRate_view().subscribe(
      (res: GsConversionView_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.settingsConversionViewRes = res;
          this.settingsConversionViewData = JSON.parse(JSON.stringify(this.settingsConversionViewRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GsConversionRate_add(data) {
    this.isConversionRateValid = true;
    if (this.invoiceFormGroup.invalid) {
      return;
    }
    else {
      this.isConversionRateValid = false;
      let body = {
        mode: this.invoiceFormGroup.value['invoiceBillplan'],
        rate_list: data.currency_list,
      }
      this.settingsService.GsConversionRate_add(body).subscribe(
        (res: GsConversionAdd_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            successAlert(res.message, res.responsestatus)
            this.GsInvoiceconversion_view()
          } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            errorAlert(res.message, res.responsestatus)
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText)
        }
      );
    }
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
