import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BillplanRatecardViewService } from 'src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service';
import {  RateCardCountryOperatorView_ApiRResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assigned-ratecard-view',
  templateUrl: './assigned-ratecard-view.component.html',
  styleUrls: ['./assigned-ratecard-view.component.css']
})
export class AssignedRatecardViewComponent implements OnInit {

  totalOperator: number;
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
      console.log(data);
      this.ratecardviewservice.getRatecardCountryOperatorView(data).subscribe((res: RateCardCountryOperatorView_ApiRResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          console.log(res)
        this.totalCountries = res.data.totalcountry;
        this.totalOperator = res.data.totaloperator;
        this.currency = res.data.currency;
        this.ratecardname = res.data.ratecardname;
        this.countryArray = res.data.countryratecard;
        this.rowArray = res.data.row;
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
