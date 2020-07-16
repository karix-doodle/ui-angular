import { Component, OnInit } from "@angular/core";
import {
  SenderCustomApiResponse,
  SenderCustomData,
} from "src/app/route-management/models/custom.model";
import { SenderCustomService } from "../../../services/RouteManagement/custom-route/sender-custom.service";
import { environment } from "../../../../../environments/environment";
import {
  errorAlert,
  successAlert,
  deleteAlert,
} from "src/app/shared/sweet-alert/sweet-alert";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Component({
  selector: "app-cr-rm-senderid",
  templateUrl: "./cr-rm-senderid.component.html",
  styleUrls: ["./cr-rm-senderid.component.css"],
})
export class CrRmSenderidComponent implements OnInit {
  senderidCustomData: SenderCustomData;
  senderidApiResponse: SenderCustomApiResponse;

  searchvalue: any;

  sortingName: any;
  isDesc: boolean;

  constructor(
    public senderService: SenderCustomService,
    public authService: AuthorizationService
    ) { }

  ngOnInit() {
    this.getAllSenderidData();
  }

  /**
   * @description gets all the mobile custom route data
   */
  getAllSenderidData() {
    this.senderService.getCustomSenderidList().subscribe(
      (res: SenderCustomApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.senderidApiResponse = res;
          this.senderidCustomData = res.data;
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
   * @param senderData consists of senderid custom data to delete
   * @description deletes the selected sender custom route data in table
   */
  deleteSenderCustom(senderData) {
    deleteAlert().then((result) => {
      if (result.value) {
        const senderidData = {
          senderid: senderData.senderid,
          id: senderData.id,
          username: "1234",
        };
        this.senderService.deleteCustomSenderTemplate(senderidData).subscribe(
          (data: any) => {
            if (data.responsestatus === "failure") {
              errorAlert(data.message);
            } else {
              successAlert(data.message);
              this.getAllSenderidData();
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
