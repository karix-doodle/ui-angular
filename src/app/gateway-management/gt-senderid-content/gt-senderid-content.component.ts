import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtSenderidContentList_ApiResponse, GtSenderidContentList_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-gt-senderid-content',
  templateUrl: './gt-senderid-content.component.html',
  styleUrls: ['./gt-senderid-content.component.css']
})
export class GtSenderidContentComponent implements OnInit {

  GtSenderidContentListDataRes: GtSenderidContentList_ApiResponse;
  GtSenderidContentListData: GtSenderidContentList_Data;

  sortingName: string;
  isDesc: boolean;
  gw_id: string = null
  gw_name: string = null

  GtMgmtAuthControls = null

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.GtMgmtAuthControls = authorizationService.authorizationState.gw_mgmt
  }

  ngOnInit() {
    this.gw_id = this.activeRoute.snapshot.params.id;
    this.gw_name = this.activeRoute.snapshot.params.name;
    this.GtSenderidContent_list()
  }

  GtSenderidContent_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
    }
    this.gatewayManagementService.GtSenderidContent_list(data).subscribe(
      (res: GtSenderidContentList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtSenderidContentListDataRes = res;
          this.GtSenderidContentListData = JSON.parse(JSON.stringify(this.GtSenderidContentListDataRes));
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

}
