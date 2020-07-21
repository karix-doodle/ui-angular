import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerManagementService } from "../../cm-services/customer-management-services";
import { APIResponse, ExistingUserData, ExistingUsers } from '../../models/customer-management.model';
import { environment } from '../../../../environments/environment';
import { errorAlert } from "../../../shared/sweet-alert/sweet-alert";
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-cm-list-table',
  templateUrl: './cm-list-table.component.html',
  styleUrls: ['./cm-list-table.component.css']
})
export class CmListTableComponent implements OnInit {

  existingUserData: ExistingUserData;
  apiResponse: APIResponse;
  existingUsersList: ExistingUsers[];
  searchvalue: any = '';

  CmAuthControls = null

  constructor(
    private customerMgmtService: CustomerManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.CmAuthControls = this.authorizationService.authorizationState.customer_management;
  }

  ngOnInit() {
    this.getExistingUserList();
  }

  getExistingUserList() {
    this.customerMgmtService.getExistingUsersList()
      .subscribe((apiResponse: any) => {
        this.apiResponse = apiResponse;
        if (apiResponse.responsecode > environment.APIStatus.success.code) {
          this.existingUserData = apiResponse.data;
          this.existingUsersList = this.existingUserData.existing_esme_lists;
        }
        else {
          errorAlert(apiResponse.message, apiResponse.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      });
  }

}
