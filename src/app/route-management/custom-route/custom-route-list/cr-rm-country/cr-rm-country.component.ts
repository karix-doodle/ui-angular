import { Component, OnInit } from "@angular/core";
import {
  CountryCustomApiResponse,
  CountryOperatorCustomData,
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
import { CountryOperatorCustomService } from "src/app/route-management/services/RouteManagement/custom-route/country-custom-operator.service";

@Component({
  selector: "app-cr-rm-country",
  templateUrl: "./cr-rm-country.component.html",
  styleUrls: ["./cr-rm-country.component.css"],
})
export class CrRmCountryComponent implements OnInit {
  countryCustomData: CountryOperatorCustomData;
  countryApiResponse: CountryCustomApiResponse;

  searchvalue: any;

  sortingName: any;
  isDesc: boolean;

  constructor(
    public senderService: SenderCustomService,
    public countryOperatorSevice: CountryOperatorCustomService,
    public authService: AuthorizationService
    ) { }

  ngOnInit() {
    this.getAllCountryData();
  }

  /**
   * @description gets all the country custom route data
   */
  getAllCountryData() {
    this.countryOperatorSevice.getCustomCountryOperatorList().subscribe(
      (res: CountryCustomApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.countryApiResponse = res;
          this.countryCustomData = res.data;
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
  deleteCountryCustom(senderData) {
    deleteAlert().then((result) => {
      if (result.value) {
        const countryData = {
          country: senderData.country,
          id: senderData.id,
          username: "1234",
        };
        this.countryOperatorSevice.deleteCustomCountryOperator(countryData).subscribe(
          (data: any) => {
            if (data.responsestatus === "failure") {
              errorAlert(data.message);
            } else {
              successAlert(data.message);
              this.getAllCountryData();
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
