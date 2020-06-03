import { Component, OnInit } from '@angular/core';
import { RouteManagementService } from '../services/RouteManagement/route-management.service';
import { RouteMgmtSummary, SummaryData } from '../models/RouteManagement/routeMgmt';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

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
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.summary = res.data;
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          });
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        });
      }
    );
  }

}
