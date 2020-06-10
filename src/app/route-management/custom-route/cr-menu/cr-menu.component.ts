import { Component, OnInit } from "@angular/core";
import { CustomService } from "../../services/RouteManagement/custom-route/custom.service";
import {
  CustomSummary_Data,
  CustomSummary_ApiResponse,
} from "../../models/custom.model";
import { environment } from "src/environments/environment";
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';

@Component({
  selector: "app-cr-menu",
  templateUrl: "./cr-menu.component.html",
  styleUrls: ["./cr-menu.component.css"],
})
export class CrMenuComponent implements OnInit {
  customSummaryApiResponse: CustomSummary_ApiResponse;
  customSummaryData: CustomSummary_Data;

  constructor(public customService: CustomService) {}

  ngOnInit() {
    this.getSummaryData();
  }

  getSummaryData() {
    this.customService.getCustomRouteSummary().subscribe(
      (res: CustomSummary_ApiResponse) => {
        console.log(res);
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.customSummaryApiResponse = res;
          this.customSummaryData = JSON.parse(
            JSON.stringify(this.customSummaryApiResponse.data)
          );
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus)
        }
      },
      (error) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
}
