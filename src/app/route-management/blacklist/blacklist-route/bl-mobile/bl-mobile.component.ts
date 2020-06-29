import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { BlackListAddMobileService } from "src/app/route-management/services/RouteManagement/blacklist/black-list-add-mobile.service";
import {
  MobileBlack_List,
  MobileBlackList_ApiResponse,
  MobileBlackList_DeleteResponse,
} from "src/app/route-management/models/BlackList/blacklist.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  successAlert,
  deleteAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Component({
  selector: "app-bl-mobile",
  templateUrl: "./bl-mobile.component.html",
  styleUrls: ["./bl-mobile.component.css"],
})
export class BlMobileComponent implements OnInit {
  constructor(
    public blMobileService: BlackListAddMobileService,
    private authService: AuthorizationService
    ) {}

  searchvalue: any = "";
  sortingName: any;
  isDesc: boolean;
  blMobileData: MobileBlack_List;
  blackListApiResponse: MobileBlackList_ApiResponse;
  ngOnInit() {
    this.getAllBlMobileData();
  }

  /**
   * @description gets all the mobile blacklist route data
   */
  getAllBlMobileData() {
    this.blMobileService.getBlackListMobile().subscribe(
      (res: MobileBlackList_ApiResponse) => {
        console.log(res);
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.blackListApiResponse = res;
          this.blMobileData = JSON.parse(
            JSON.stringify(this.blackListApiResponse.data)
          );
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus);
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }

  /**
   *
   * @param mobilerouteData consists of mobile senderid blacklist data to delete
   * @description deletes the selected mobile senderid blacklist route data in table
   */
  deleteBlMobile(mobilerouteData) {
    deleteAlert().then((result) => {
      if (result.value) {
        const mobileData = {
          senderid: mobilerouteData.senderid,
          id: mobilerouteData.id,
          mobile: mobilerouteData.mobile,
        };
        this.blMobileService
          .deleteBlackListMobile(mobileData)
          .subscribe((data: MobileBlackList_DeleteResponse) => {
            if (data.responsestatus === "failure") {
              errorAlert(data.message);
            } else {
              successAlert(data.message);
              this.getAllBlMobileData();
            }
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
          });
      }
    });
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
