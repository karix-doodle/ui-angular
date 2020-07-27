import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from "./services/dashboard.service";

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
        console.log(`apiResponse:${JSON.stringify(apiResponse)}`);
      }, (error: HttpErrorResponse) => {
        console.log(`errorMessage:${error.message}: errorStatusText:${error.statusText}`);
      });
  }

}
