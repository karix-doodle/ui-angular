import { Component, OnInit } from "@angular/core";
import { CustomService } from "src/app/route-management/services/RouteManagement/custom-route/custom.service";
import { MobileSenderidCustomService } from "src/app/route-management/services/RouteManagement/custom-route/mobile-custom-senderid.service";
import { ToastrManager } from "ng6-toastr-notifications";
import {
  MobileCustomSenderId_ApiResponse,
  MobileSenderList_Data,
  MobileCustomSender_Data,
  MobileCustomResponse,
} from "src/app/route-management/models/custom.model";
import { environment } from "src/environments/environment";
import {
  errorAlert,
  deleteAlert,
  successAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-cr-rm-mobile-senderid",
  templateUrl: "./cr-rm-mobile-senderid.component.html",
  styleUrls: ["./cr-rm-mobile-senderid.component.css"],
})
export class CrRmMobileSenderidComponent implements OnInit {
  constructor(
    public mobileSenderidCustomService: MobileSenderidCustomService,
    public customService: CustomService,
    public toastr: ToastrManager
  ) {}

  mobileSenderidCustomData: MobileCustomSender_Data;
  mobileSenderidApiResponse: MobileCustomSenderId_ApiResponse;
  searchvalue: any;
  sortingName: any;
  isDesc: boolean;

  ngOnInit() {
    this.getAllMobileSenderidData();
  }

  /**
   * @description gets all the mobile custom route data
   */
  getAllMobileSenderidData() {
    this.mobileSenderidCustomService.getCustomMobileSenderidList().subscribe(
      (res: MobileCustomSenderId_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.mobileSenderidApiResponse = res;
          this.mobileSenderidCustomData = JSON.parse(
            JSON.stringify(this.mobileSenderidApiResponse.data)
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
   * @param mobilesenderData consists of mobile and senderid custom data to delete
   * @description deletes the selected mobile sender custom route data in table
   */
  deleteMobileCustom(mobilesenderData) {
    deleteAlert().then((result) => {
      if (result.value) {
        const mobileData = {
          senderid: mobilesenderData.senderid,
          id: mobilesenderData.id,
          mobile: mobilesenderData.mobile,
          username: "1234",
        };
        this.mobileSenderidCustomService
          .deleteCustomMobileSenderid(mobileData)
          .subscribe(
            (data: MobileCustomResponse) => {
              if (data.responsestatus === "failure") {
                errorAlert(data.message);
              } else {
                successAlert(data.message);
                this.getAllMobileSenderidData();
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
