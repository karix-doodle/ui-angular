import { Component, OnInit } from "@angular/core";
import { BlackListAddMobileSenderidService } from "src/app/route-management/services/RouteManagement/blacklist/black-list-add-mobile-senderid.service";
import {
  MobileSenderidCotentBlackList_ApiResponse,
  MobileSenderidContentBlack_List,
} from "src/app/route-management/models/BlackList/blacklist.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  deleteAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Component({
  selector: "app-bl-senderid",
  templateUrl: "./bl-senderid.component.html",
  styleUrls: ["./bl-senderid.component.css"],
})
export class BlSenderidComponent implements OnInit {
  constructor(
    public blSenderService: BlackListAddMobileSenderidService,
    public authService: AuthorizationService
    ) {}

  searchvalue: any;

  sortingName: any;
  isDesc: boolean;

  blSenderApiResponse: MobileSenderidCotentBlackList_ApiResponse;
  blSenderData: MobileSenderidContentBlack_List;

  ngOnInit() {
    this.getAllBlSenderData();
  }

  /**
   * @description gets all the mobile blacklist route data
   */
  getAllBlSenderData() {
    this.blSenderService.getBlSenderData().subscribe(
      (res: MobileSenderidCotentBlackList_ApiResponse) => {
        // console.log(res);
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.blSenderApiResponse = res;
          this.blSenderData = JSON.parse(
            JSON.stringify(this.blSenderApiResponse.data)
          );
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus);
        }
      },
      (error) => {
        errorAlert(error.name, error.statusText);
      }
    );
  }

  /**
   *
   * @param senderData consists of sender blacklist data to delete
   * @description deletes the selected sender blacklist route data in table
   */
  deleteBlMobileSender(senderData) {
    deleteAlert().then((result) => {
      if (result.value) {
        const senderrouteData = {
          id: senderData.id,
          senderid: senderData.senderid,
        };
        this.blSenderService
          .deleteBlSender(senderrouteData)
          .subscribe((data: any) => {
            if (data.responsestatus === "failure") {
              errorAlert(data.message);
            } else {
              successAlert(data.message);
              this.getAllBlSenderData();
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
