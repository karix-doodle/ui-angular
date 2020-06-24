import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BillplanRatecardViewService } from 'src/app/billplan-management/services/billplan-ratecard-view/billplan-ratecard-view.service';
import { RateCardCountryOperatorView_ApiRResponse, RateCardGroupView_ApiRResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assigned-ratecard-view',
  templateUrl: './assigned-ratecard-view.component.html',
  styleUrls: ['./assigned-ratecard-view.component.css']
})
export class AssignedRatecardViewComponent implements OnInit {

  totalgroup: number;
  totalCountries: number;
  currency: string;
  ratecardname: string;
  countryArray = [];
  rowArray = [];
  roc = []
  constructor(
    private Route: ActivatedRoute,
    private ratecardviewservice: BillplanRatecardViewService
  ) {}

  ngOnInit() {
    this.Route.params.subscribe((data: Params) => {
      this.ratecardviewservice.getRatecardGroupView(data).subscribe((res: RateCardGroupView_ApiRResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
        this.totalCountries = data.data.totalcountry;
        this.totalgroup = data.data.totalgroup;
        this.currency = data.data.currency;
        this.ratecardname = data.data.ratecardname;
        this.countryArray = data.data.countryratecard;
        this.roc= data.data.roc
        this.rowArray = data.data.row
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
