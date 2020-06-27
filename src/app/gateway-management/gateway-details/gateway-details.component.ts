import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetails_ApiResponse, GtDetails_Data, GtAddedCountryList_ApiResponse, GtAddedCountryList_Data, GtInactiveCountryList_ApiResponse, GtInactiveCountryList_Data, GtPriceChangeCountryList_ApiResponse, GtPriceChangeCountryList_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.css']
})
export class GatewayDetailsComponent implements OnInit {

  GtAddedCountryListDataRes: GtAddedCountryList_ApiResponse;
  GtAddedCountryListData: GtAddedCountryList_Data;
  GtInactiveCountryListDataRes: GtInactiveCountryList_ApiResponse;
  GtInactiveCountryListData: GtInactiveCountryList_Data;
  GtPriceChangeCountryListDataRes: GtPriceChangeCountryList_ApiResponse;
  GtPriceChangeCountryListData: GtPriceChangeCountryList_Data;
  GtDetailsDataRes: GtDetails_ApiResponse;
  GtDetailsData: GtDetails_Data;

  senderIdType = environment.senderIdType

  GtMgmtAuthControls = null
  gwId = null

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
    console.log(this.GtMgmtAuthControls, 'adadasdas')
    this.gwId = this.activeRoute.snapshot.params.id;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.GatewayDetails_view();
  }

  GatewayDetails_view() {
    let data = {
      gw_id: this.gwId,
    }
    this.gatewayManagementService.GatewayDetails_view(data).subscribe(
      (res: GtDetails_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsDataRes = res;
          this.GtDetailsData = JSON.parse(JSON.stringify(this.GtDetailsDataRes));
          this.GtAddedCountry_list();
          this.GtInactiveCountry_list();
          this.GtPriceChangeCountry_list();
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtAddedCountry_list() {
    let data = {
      gw_id: this.gwId,
      gw_name: this.GtDetailsDataRes.data.gw_name
    }
    this.gatewayManagementService.GtAddedCountry_list(data).subscribe(
      (res: GtAddedCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtAddedCountryListDataRes = res;
          this.GtAddedCountryListData = JSON.parse(JSON.stringify(this.GtAddedCountryListDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtInactiveCountry_list() {
    let data = {
      gw_id: this.gwId,
      gw_name: this.GtDetailsDataRes.data.gw_name
    }
    this.gatewayManagementService.GtInactiveCountry_list(data).subscribe(
      (res: GtInactiveCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtInactiveCountryListDataRes = res;
          this.GtInactiveCountryListData = JSON.parse(JSON.stringify(this.GtInactiveCountryListDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

  GtPriceChangeCountry_list() {
    let data = {
      gw_id: this.gwId,
      gw_name: this.GtDetailsDataRes.data.gw_name
    }
    this.gatewayManagementService.GtPriceChangeCountry_list(data).subscribe(
      (res: GtPriceChangeCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtPriceChangeCountryListDataRes = res;
          this.GtPriceChangeCountryListData = JSON.parse(JSON.stringify(this.GtPriceChangeCountryListDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }

}
