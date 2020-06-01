import { Component, OnInit } from '@angular/core';
import { RouteManagementService } from '../services/RouteManagement/route-management.service';
import { RouteMgmtSummary, SummaryData } from '../models/RouteManagement/routeMgmt';

@Component({
  selector: 'app-rm-menu-page',
  templateUrl: './rm-menu-page.component.html',
  styleUrls: ['./rm-menu-page.component.css']
})
export class RmMenuPageComponent implements OnInit {
  summary: SummaryData;
  constructor(private routeManagementService: RouteManagementService) { }

  ngOnInit() {
    this.routeManagementService.getRouteMgmtSummary().subscribe(
      (res: RouteMgmtSummary) => {
        if (res.responsestatus === 'success') {
          this.summary = res.data;
        }
      }, error => {
        console.log(error);
      }
    );
  }

}
