import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { GsDefaultCountryOperator_ApiResponse, GsDefaultCountryOperator_Data, GsDefaultCountry_ApiResponse, GsDefaultCountry_Data } from '../models/settings.model';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-standard-billplan',
  templateUrl: './standard-billplan.component.html',
  styleUrls: ['./standard-billplan.component.css']
})

export class StandardBillplanComponent implements OnInit {

  gsDefaultCountryOperatorRes: GsDefaultCountryOperator_ApiResponse;
  gsDefaultCountryOperatorData: GsDefaultCountryOperator_Data;
  gsDefaultCountryRes: GsDefaultCountry_ApiResponse;
  gsDefaultCountryData: GsDefaultCountry_Data;

  accountType: string;
  accounts: string[] = ['Country & Operator', 'Country'];

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.accountType = this.accounts[0];

    this.Globalsetting_defaultCountryOperator();
    this.Globalsetting_defaultCountry();
  }

  GsDefaultCountryOperator_download() {
    this.settingsService.GsDefaultCountryOperator_download().subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'SettingDefaultCountryOperator-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GsDefaultCountry_download() {
    this.settingsService.GsDefaultCountry_download().subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'SettingDefaultCountry-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  Globalsetting_defaultCountryOperator() {
    this.settingsService.Globalsetting_defaultCountryOperator().subscribe(
      (res: GsDefaultCountryOperator_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gsDefaultCountryOperatorRes = res;
          this.gsDefaultCountryOperatorData = JSON.parse(JSON.stringify(this.gsDefaultCountryOperatorRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  Globalsetting_defaultCountry() {
    this.settingsService.Globalsetting_defaultCountry().subscribe(
      (res: GsDefaultCountry_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gsDefaultCountryRes = res;
          this.gsDefaultCountryData = JSON.parse(JSON.stringify(this.gsDefaultCountryRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }
}
