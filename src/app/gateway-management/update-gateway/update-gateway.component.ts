import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDefaultTemplate_ApiResponse, GtDefaultTemplate_Data, getHeaderFromFile_ApiResponse, GtprocessPriceFile_ApiResponse, GtprocessPriceFile_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { addValidators, removeValidators } from '../../shared/helper/helperFunctions';

import { DndDropEvent, DropEffect } from "ngx-drag-drop";

import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-update-gateway',
  templateUrl: './update-gateway.component.html',
  styleUrls: ['./update-gateway.component.css']
})

export class UpdateGatewayComponent implements OnInit {

  GtDefaultTemplateDataRes: GtDefaultTemplate_ApiResponse;
  GtDefaultTemplateData: GtDefaultTemplate_Data;

  GtprocessPriceFileDataRes: GtprocessPriceFile_ApiResponse;
  GtprocessPriceFileData: GtprocessPriceFile_Data;

  priceListFormGroup: FormGroup;
  isPriceListValid: boolean = false;
  isGtPriceUpdateValid: boolean = false;

  priceFileData: FormData = null;
  getFileHeaderData: FormData = null;

  disableWrapper: boolean = false
  isfrom_email: boolean = false
  isfrom_subject: boolean = false
  selectedFileName: string = ''

  gt_id: string
  gt_name: string

  @ViewChild('filenameInput', { static: false }) filenameInput: any;

  @ViewChild('priceListSubmitSuccess', { static: true })
  priceListSubmitSuccess: TemplateRef<any>;

  draggableListLeft = [];

  draggableListRight = [
    {
      content: "Drop Country Name here",
      column: "country_column",
      text: "Country Name"
    },
    {
      content: "Drop Operator / Network Name Here",
      column: "operator_column",
      text: "Operator / Network"
    },
    {
      content: "Drop MCC Here",
      column: "mcc_column",
      text: "MCC"
    },
    {
      content: "Drop MNC Here",
      column: "mnc_column",
      text: "MNC"
    },
    {
      content: "Drop MCC + MNC Here (Optional)",
      column: "mcc_mnc_column",
      text: "MCC + MNC"
    },
    {
      content: "Drop Price / New Price Here",
      column: "newprice_column",
      text: "Price / New Price"
    },
    {
      content: "Drop Old Price Here",
      column: "oldprice_column",
      text: "Old Price"
    },
    {
      content: "Drop Effective From Here",
      column: "effectivefrom_column",
      text: "Effective From"
    },
    {
      content: "Drop Change Type Here",
      column: "changetype_column",
      text: "Change Type"
    },
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private gatewayManagementService: GatewayManagementService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.priceListFormGroup = this.formBuilder.group({
      gw_id: [this.activeRoute.snapshot.params.id, [Validators.required]],
      filename: ['', [Validators.required]],
      headers: [''],
      country_column: [''],
      operator_column: [''],
      mcc_column: [''],
      mnc_column: [''],
      mcc_mnc_column: [''],
      newprice_column: ['', [Validators.required]],
      oldprice_column: [''],
      effectivefrom_column: ['', [Validators.required]],
      effective_ts_format: ['', [Validators.required]],
      changetype_column: [''],
      is_autocompile: [''],
      notify_email: [''],
      from_email: [''],
      from_subject: [''],
      read_body: [''],
      read_attachment: [''],
      comment: [''],
      gw_currencyid: [Number(this.activeRoute.snapshot.params.currencyId)],
      useexistingtemplate: [''],
      overrideexisting: [''],
    });

    this.gt_id = this.activeRoute.snapshot.params.id
    this.gt_name = this.activeRoute.snapshot.params.name
  }

  ngOnInit() {
    this.GtDefaultTemplate()
  }

  onDrop(event: DndDropEvent, column: string) {

    if (event.dropEffect === "copy") {
      let obj = {}
      obj[column] = event.data.content
      this.priceListFormGroup.patchValue(obj)
    }
  }

  removeDroppedPriceList(column: string) {
    let obj = {}
    obj[column] = ""
    this.priceListFormGroup.patchValue(obj)
  }

  changeDefaultRule(event) {
    if (event) {
      this.GtDefaultTemplate()
    } else {
      this.getFileHeaderData = null
      this.selectedFileName = ''
      this.filenameInput.nativeElement.value = '';
      this.disableWrapper = false
      this.priceListFormGroup.patchValue({
        useexistingtemplate: false,
        overrideexisting: true,
        filename: ''
      })
    }
  }

  emailsubjectCheck(value, key, field) {
    if (key == 'isfrom_email') {
      this.isfrom_email = value
    } else {
      this.isfrom_subject = value
    }
    let obj = {}
    if (value == false) {
      obj[field] = "";
      this.priceListFormGroup.patchValue(obj)
    }
  }

  checkboxToggle(value, field) {
    console.log(value, 'asdasdasd')
    let obj = {}
    obj[field] = value == true ? 1 : '';
    this.priceListFormGroup.patchValue(obj)
  }

  GtDefaultTemplate() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_offset: 'UTC' + environment.UTC
    }
    this.gatewayManagementService.GtDefaultTemplate(data).subscribe(
      (res: GtDefaultTemplate_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDefaultTemplateDataRes = res;
          this.GtDefaultTemplateData = JSON.parse(JSON.stringify(this.GtDefaultTemplateDataRes));

          if (this.GtDefaultTemplateDataRes.switch_enabled) {
            this.disableWrapper = this.GtDefaultTemplateDataRes.switch_on
            this.priceListFormGroup.patchValue({
              country_column: this.GtDefaultTemplateDataRes.data.country_column,
              operator_column: this.GtDefaultTemplateDataRes.data.operator_column,
              mcc_column: this.GtDefaultTemplateDataRes.data.mcc_column,
              mnc_column: this.GtDefaultTemplateDataRes.data.mnc_column,
              mcc_mnc_column: this.GtDefaultTemplateDataRes.data.mcc_mnc_column,
              newprice_column: this.GtDefaultTemplateDataRes.data.newprice_column,
              oldprice_column: this.GtDefaultTemplateDataRes.data.oldprice_column,
              effectivefrom_column: this.GtDefaultTemplateDataRes.data.effectivefrom_column,
              effective_ts_format: this.GtDefaultTemplateDataRes.data.effective_ts_format,
              changetype_column: this.GtDefaultTemplateDataRes.data.changetype_column,
              is_autocompile: this.GtDefaultTemplateDataRes.data.is_autocompile,
              notify_email: this.GtDefaultTemplateDataRes.data.notify_email,
              from_email: this.GtDefaultTemplateDataRes.data.from_email,
              from_subject: this.GtDefaultTemplateDataRes.data.from_subject,
              read_body: this.GtDefaultTemplateDataRes.data.read_body,
              read_attachment: this.GtDefaultTemplateDataRes.data.read_attachment ? 1 : '',
              comment: this.GtDefaultTemplateDataRes.data.comment,
              useexistingtemplate: this.GtDefaultTemplateDataRes.switch_on ? true : false,
              overrideexisting: this.GtDefaultTemplateDataRes.switch_on ? false : true
            });

            this.isfrom_email = this.GtDefaultTemplateDataRes.data.from_email != null && this.GtDefaultTemplateDataRes.data.from_email != '' ? true : false;
            this.isfrom_subject = this.GtDefaultTemplateDataRes.data.from_subject != null && this.GtDefaultTemplateDataRes.data.from_subject != '' ? true : false;

            this.draggableListLeft = []
            let headerValue = []
            this.draggableListRight.forEach((item) => {
              if (this.GtDefaultTemplateDataRes.data[item.column] != null) {
                this.draggableListLeft.push({
                  content: this.GtDefaultTemplateDataRes.data[item.column]
                })
                headerValue.push(this.GtDefaultTemplateDataRes.data[item.column])
              }
            })
            this.priceListFormGroup.patchValue({
              headers: headerValue
            })

          } else {
            this.priceListFormGroup.patchValue({
              useexistingtemplate: false,
              overrideexisting: true
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

  fileUpload(files) {
    if (files.length === 0) {
      return;
    }
    const file = files.item(0);
    this.selectedFileName = file.name
    const formData: FormData = new FormData();
    const getHeaderFormData: FormData = new FormData();
    formData.append("req_type", "fileupload");
    formData.append("gw_id", this.activeRoute.snapshot.params.id);
    formData.append("file", file, file.name);
    getHeaderFormData.append("file", file, file.name);
    formData.append("source", "upload");
    formData.append("createdby", String(environment.loggedinusername));
    formData.append("loggedinempid", String(environment.loggedinempid));

    this.priceFileData = formData
    this.getFileHeaderData = getHeaderFormData
  }

  isFieldValid(field: string) {
    return this.priceListFormGroup.get(field).value;
  }

  submitPriceFile() {
    if (this.selectedFileName != "") {
      this.getHeaderFromFile(this.getFileHeaderData)
    }
  }

  getHeaderFromFile(data) {
    this.gatewayManagementService.getHeaderFromFile(data).subscribe(
      (res: getHeaderFromFile_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          if (this.priceListFormGroup.get('overrideexisting').value) {

            this.priceListFormGroup.patchValue({
              country_column: '',
              operator_column: '',
              mcc_column: '',
              mnc_column: '',
              mcc_mnc_column: '',
              newprice_column: '',
              oldprice_column: '',
              effectivefrom_column: '',
              effective_ts_format: '',
              changetype_column: '',
            });
            this.disableWrapper = false

            this.draggableListLeft = [];
            let headerValue = []
            res.data.forEach((item) => {
              this.draggableListLeft.push({
                content: item
              })
              headerValue.push(item)
            })

            this.priceListFormGroup.patchValue({
              headers: headerValue
            });

          }

          this.priceListFormGroup.patchValue({
            filename: res.filename
          });

        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  onSubmitUpdateGatewayPrice(data) {
    this.isGtPriceUpdateValid = true;
    let priceValidation = false;

    data.is_autocompile = data.is_autocompile == true ? 1 : 0

    removeValidators(this.priceListFormGroup, 'operator_column')
    removeValidators(this.priceListFormGroup, 'country_column')
    removeValidators(this.priceListFormGroup, 'mcc_mnc_column')
    removeValidators(this.priceListFormGroup, 'mnc_column')
    removeValidators(this.priceListFormGroup, 'mcc_column')

    if (data.is_autocompile == 1) {
      addValidators(this.priceListFormGroup, 'notify_email')
      addValidators(this.priceListFormGroup, 'from_email')
      addValidators(this.priceListFormGroup, 'from_subject')
      addValidators(this.priceListFormGroup, 'read_attachment')
    } else {
      removeValidators(this.priceListFormGroup, 'notify_email')
      removeValidators(this.priceListFormGroup, 'from_email')
      removeValidators(this.priceListFormGroup, 'from_subject')
      removeValidators(this.priceListFormGroup, 'read_attachment')
    }

    if (this.priceListFormGroup.invalid) {
      return;
    }

    if ((data.country_column != "" && data.country_column != null) && (data.operator_column != "" && data.operator_column != null)) {
      priceValidation = true
    } else if ((data.mcc_column != "" && data.mcc_column != null)) {
      priceValidation = true
    } else if (data.mcc_mnc_column != "" && data.mcc_mnc_column != null) {
      priceValidation = true
    }

    if (!priceValidation) {
      addValidators(this.priceListFormGroup, 'operator_column')
      addValidators(this.priceListFormGroup, 'country_column')
      addValidators(this.priceListFormGroup, 'mcc_mnc_column')
      addValidators(this.priceListFormGroup, 'mnc_column')
      addValidators(this.priceListFormGroup, 'mcc_column')
      return
    }

    else {
      this.isGtPriceUpdateValid = false;
      data.read_body = data.read_body == true ? 1 : 0
      data.read_attachment = data.read_attachment == true ? 1 : 0

      this.gatewayManagementService.GtprocessPriceFile(data).subscribe(
        (res: GtprocessPriceFile_ApiResponse) => {
          if (res.status === 'SUCCESS') {
            this.GtprocessPriceFileDataRes = res;
            this.GtprocessPriceFileData = JSON.parse(JSON.stringify(this.GtprocessPriceFileDataRes));

            if (this.GtprocessPriceFileDataRes.invalid == 0) {
              successAlert(res.response, res.status)
            } else {
              this.modalService.open(this.priceListSubmitSuccess)
            }
            this.router.navigate(['gateway-management/gateway-details/' + this.activeRoute.snapshot.params.id]);
          } else if (res.status === 'FAILURE') {
            errorAlert(res.response, res.status)
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText)
        }
      );

    }
  }
}
