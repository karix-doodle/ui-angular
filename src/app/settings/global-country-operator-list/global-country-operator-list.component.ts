import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { SettingsService } from '../services/settings.service';
import {
  GsGlobalCountryOperator_ApiResponse,
  GsGlobalCountryOperator_Data,
  GsCountryOperatorEdit_ApiResponse,
  GsCountryOperatorEdit_Data,
  GsCountryOperatorupdate_ApiResponse
} from '../models/settings.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-global-country-operator-list',
  templateUrl: './global-country-operator-list.component.html',
  styleUrls: ['./global-country-operator-list.component.css']
})
export class GlobalCountryOperatorListComponent implements OnInit {

  gsGlobalCountryOperatorRes: GsGlobalCountryOperator_ApiResponse;
  gsGlobalCountryOperatorData: GsGlobalCountryOperator_Data;

  gsCountryOperatorEditRes: GsCountryOperatorEdit_ApiResponse;
  gsCountryOperatorEditData: GsCountryOperatorEdit_Data;

  editGlobalCountryOperatorFormGroup: FormGroup;
  editValidation: boolean = false

  selectedFileName: string = ''
  fileData: FormData = null;

  editCountry: string = null
  editOperator: string = null
  editSeries: any = []

  constructor(
    config: NgbModalConfig,
    private settingsService: SettingsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.initiateEditForm()
  }

  initiateEditForm() {
    this.editGlobalCountryOperatorFormGroup = this.formBuilder.group({
      req_type: new FormControl('single_type'),
      countryoperatorid: new FormControl('', [Validators.required]),
      senderid_type: new FormControl('', [Validators.required]),
      default_senderid: new FormControl('', [Validators.required]),
      series: new FormControl('', [Validators.pattern('^[0-9,]*$')]),
      removeseries: new FormControl([]),
      file: new FormControl(''),
      searchvalue: new FormControl(''),
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  setEditValue(item) {
    this.editCountry = item.country
    this.editOperator = item.operator
    this.Globalsetting_countryOperatorEdit(item.id)
    this.editGlobalCountryOperatorFormGroup.patchValue({
      countryoperatorid: item.id
    })
  }

  close(p) { }

  ngOnInit() {
    this.Globalsetting_globalCountryOperator()
  }

  Globalsetting_globalCountryOperator() {
    this.settingsService.Globalsetting_globalCountryOperator().subscribe(
      (res: GsGlobalCountryOperator_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gsGlobalCountryOperatorRes = res;
          this.gsGlobalCountryOperatorData = JSON.parse(JSON.stringify(this.gsGlobalCountryOperatorRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  Globalsetting_countryOperatorEdit(id) {
    this.settingsService.Globalsetting_countryOperatorEdit(id).subscribe(
      (res: GsCountryOperatorEdit_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gsCountryOperatorEditRes = res;
          this.gsCountryOperatorEditData = JSON.parse(JSON.stringify(this.gsCountryOperatorEditRes));
          this.editGlobalCountryOperatorFormGroup.patchValue({
            default_senderid: this.gsCountryOperatorEditData.data.default_senderid,
            senderid_type: this.gsCountryOperatorEditData.data.senderid_type,
          })
          this.editSeries = this.gsCountryOperatorEditData.data.mobileseries
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GsGlobalCountryOperator_download() {
    this.settingsService.GsGlobalCountryOperator_download().subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'SettingGlobalCountryOperator-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  removeService(value) {
    let index = this.editSeries.indexOf(value);
    this.editSeries.splice(index, 1);
    let removeService = this.editGlobalCountryOperatorFormGroup.value.removeseries.concat(value)
    this.editGlobalCountryOperatorFormGroup.patchValue({
      removeseries: removeService,
    })
  }

  fileUpload(files) {
    if (files.length === 0) {
      return;
    }
    const file = files.item(0);
    this.selectedFileName = file.name
    const formData: FormData = new FormData();
    formData.append("req_type", "fileupload");
    formData.append("file", file, file.name);

    this.fileData = formData
  }

  removeFile() {
    this.editGlobalCountryOperatorFormGroup.patchValue({
      file: ''
    })
    this.selectedFileName = ''
  }

  onSubmitEditGlobalCountryOperatorFormGroup(data) {
    this.editValidation = true;
    if (this.editGlobalCountryOperatorFormGroup.invalid) {
      return;
    } else {
      this.editValidation = false;
      if (data.file != '') {
        this.fileUploadService(data);
      } else {
        this.normalEditService(data);
      }
    }
  }

  fileUploadService(data) {
    this.fileData.append('countryoperatorid', data.countryoperatorid)
    this.fileData.append('senderid_type', data.senderid_type)
    this.fileData.append('default_senderid', data.default_senderid)
    this.fileData.append('removeseries', data.removeseries)
    this.fileData.append('loggedinempid', String(environment.loggedinempid))
    this.fileData.append('loggedinusername', String(environment.loggedinusername))

    this.settingsService.Globalsetting_updateCountryOperatorFile(this.fileData).subscribe(
      (res: GsCountryOperatorupdate_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          successAlert(res.message, res.responsestatus)
          this.resetFormEdit()
          this.Globalsetting_globalCountryOperator()
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );

  }

  checkSeries() {
    let series = this.editGlobalCountryOperatorFormGroup.value.series
    this.editGlobalCountryOperatorFormGroup.patchValue({
      series: series && series.split(',').filter(Boolean)
    })
  }

  seriesCheckComma(value) {
    return value && value.split(',').filter(Boolean)
  }

  normalEditService(data) {
    let updateData = { ...data }
    delete updateData.file
    delete updateData.searchvalue
    updateData.series = updateData.series.toString();
    updateData.removeseries = updateData.removeseries.toString();
    updateData.senderid_type = Number(updateData.senderid_type);
    this.settingsService.Globalsetting_updateCountryOperator(updateData).subscribe(
      (res: GsCountryOperatorupdate_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          successAlert(res.message, res.responsestatus)
          this.resetFormEdit()
          this.Globalsetting_globalCountryOperator()
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  resetFormEdit() {
    this.modalService.dismissAll()
    this.selectedFileName = '';
    this.initiateEditForm()
  }

}
