import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerManagementService } from "../../cm-services/customer-management-services";
import {APIResponse, ExistingUserData,ExistingUsers } from '../../models/customer-management.model';
import { environment } from '../../../../environments/environment';
import { errorAlert} from "../../../shared/sweet-alert/sweet-alert";


@Component({
  selector: 'app-cm-list-table',
  templateUrl: './cm-list-table.component.html',
  styleUrls: ['./cm-list-table.component.css']
})
export class CmListTableComponent implements OnInit {

  existingUserData:ExistingUserData;
  apiResponse:APIResponse;
  existingUsersList:ExistingUsers[];
  searchvalue: any = '';
  constructor(private customerMgmtService:CustomerManagementService) { }

  ngOnInit() {
    this.getExistingUserList();
  }

  getExistingUserList()
  {
    this.customerMgmtService.getExistingUsersList()
    .subscribe((apiResponse:any)=>{
      this.apiResponse = apiResponse;
      if(apiResponse.responsecode > environment.APIStatus.success.code)
      {
        this.existingUserData = apiResponse.data;
        this.existingUsersList=this.existingUserData.existing_esme_lists;
        console.log(`data:${JSON.stringify(this.existingUserData)}`);
      }
      else
      {
        errorAlert(apiResponse.message, apiResponse.responsestatus)
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText);
    });
  }

}
