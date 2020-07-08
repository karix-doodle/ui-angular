import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../services/settings.service';
import { SettingsTimeZone_ApiResponse, SettingsTimeZone_Data, SettingsCurrency_ApiResponse, SettingsCurrency_Data } from '../models/settings.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  settingsTimeZoneDataRes: SettingsTimeZone_ApiResponse;
  settingsTimeZoneData: SettingsTimeZone_Data;
  settingsCurrencyDataRes: SettingsCurrency_ApiResponse;
  settingsCurrencyData: SettingsCurrency_Data;

  constructor(
    config: NgbModalConfig,
    private settingsService: SettingsService,
    private modalService: NgbModal
  ) { }

  open(content) {
    // this.modalService.open(content);
    this.modalService.open(content, { windowClass: "viewAudit" });
  }

  ngOnInit() {
    this.Globalsetting_timezone();
    this.Globalsetting_currency();
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

}
