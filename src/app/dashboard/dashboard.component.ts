import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from './services/dashboard.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }
  apiResponse: any;

  ngOnInit() {
    this.testToken();
  }

  testToken() {
    this.dashboardService.getTesttokens()
      .subscribe((apiResponse: any) => {
        this.apiResponse = apiResponse;
        // console.log(apiResponse);
        if (apiResponse.responsestatus === environment.APIStatus.error.text
          && apiResponse.responsecode < environment.APIStatus.error.code) {
          // console.log('error');
          // console.log(`apiResponse:${JSON.stringify(apiResponse)}`);
        }
      }, (error: HttpErrorResponse) => {
        // console.log(`errorMessage:${error.message}: errorStatusText:${error.statusText}`);
        // console.log(error);
      });
  }

}
