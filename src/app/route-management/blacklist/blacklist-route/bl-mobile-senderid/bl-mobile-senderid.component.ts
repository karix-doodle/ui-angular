import { Component, OnInit } from "@angular/core";
import { BlackListAddSenderidService } from "src/app/route-management/services/RouteManagement/blacklist/black-list-add-senderid.service";
import {
  MobileSenderidBlackList_ApiResponse,
  MobileSenderidBlack_List,
} from "src/app/route-management/models/BlackList/blacklist.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  deleteAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Component({
  selector: "app-bl-mobile-senderid",
  templateUrl: "./bl-mobile-senderid.component.html",
  styleUrls: ["./bl-mobile-senderid.component.css"],
})
export class BlMobileSenderidComponent implements OnInit {
  constructor(
    public blMobileService: BlackListAddSenderidService,
    public authService: AuthorizationService) {}

  searchvalue: any;
  sortingName: any;
  isDesc: boolean;
  blackListApiResponse: MobileSenderidBlackList_ApiResponse;
  blMobileSenderData: MobileSenderidBlack_List;

  ngOnInit() {
    this.getAllBlMobileSenderData();
  }

  /**
   * @description gets all the mobile blacklist route data
   */
  getAllBlMobileSenderData() {
    this.blMobileService.getBlMobileSenderData().subscribe(
      (res: MobileSenderidBlackList_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.blackListApiResponse = res;
          this.blMobileSenderData = JSON.parse(
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
   * @param mobilerouteData consists of mobile blacklist data to delete
   * @description deletes the selected mobile blacklist route data in table
   */
  deleteBlMobileSender(mobilerouteData) {
    deleteAlert().then((result) => {
      if (result.value) {
        const mobileData = {
          id: mobilerouteData.id,
          mobile: mobilerouteData.mobile,
          senderid: mobilerouteData.senderid,
        };
        this.blMobileService.deleteBlMobileSender(mobileData).subscribe(
          (data: any) => {
            if (data.responsestatus === "failure") {
              errorAlert(data.message);
            } else {
              successAlert(data.message);
              this.getAllBlMobileSenderData();
            }
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.message, error.statusText);
          }
        );
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
