import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CustomerManagementService } from '../../services/customer-management.service';
import { PendingUsers_ApiResponse, PendingUsers } from '../../models/customer-management.model';
import Swal from 'sweetalert2';
import {
  errorAlert,
  successAlert,
} from "../../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-pending-activate-table',
  templateUrl: './pending-activate-table.component.html',
  styleUrls: ['./pending-activate-table.component.css']
})
export class PendingActivateTableComponent implements OnInit {

  apiResponse : PendingUsers_ApiResponse;
  usersData: PendingUsers;
  sortingName: string;
  isDesc: boolean;
  searchvalue: any = '';

  constructor(private customerManagementService: CustomerManagementService) { }

  ngOnInit() {
    this.getPendingForActivationUsersList();
  }

  getPendingForActivationUsersList() {
    this.customerManagementService.getUsersPendingForActivation().subscribe(
      (res: PendingUsers_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.apiResponse = res;
          this.usersData = JSON.parse(JSON.stringify(this.apiResponse));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  };



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
  };

};
