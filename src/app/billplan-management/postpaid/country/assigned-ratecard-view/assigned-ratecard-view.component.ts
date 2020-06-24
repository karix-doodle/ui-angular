import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BillplanRatecardViewService } from "src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service";
import { RateCardCountryView_ApiRResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-assigned-ratecard-view",
  templateUrl: "./assigned-ratecard-view.component.html",
  styleUrls: ["./assigned-ratecard-view.component.css"],
})
export class AssignedRatecardViewComponent implements OnInit {
  totalCountries: number;
  currency: string;
  ratecardname: string;
  countryArray = [];
  rowArray = [];
  constructor(
    private Route: ActivatedRoute,
    private ratecardviewservice: BillplanRatecardViewService
  ) {}

  ngOnInit() {
    this.Route.params.subscribe((data: Params) => {
      this.ratecardviewservice.getRatecardCountryView(data).subscribe((res: RateCardCountryView_ApiRResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
        this.totalCountries = data.data.totalcountry;
        this.currency = data.data.currency;
        this.ratecardname = data.data.ratecardname;
        this.countryArray = data.data.countryratecard;
        this.rowArray = data.data.row;
       } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.responsestatus)
       }
    }, (error: HttpErrorResponse) => {
       errorAlert(error.message, error.statusText)
    }
    );
  });
}
}

