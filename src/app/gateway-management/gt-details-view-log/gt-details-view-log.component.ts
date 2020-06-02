import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetailsViewLog_ApiResponse, GtDetailsViewLog_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gt-details-view-log',
  templateUrl: './gt-details-view-log.component.html',
  styleUrls: ['./gt-details-view-log.component.css']
})
export class GtDetailsViewLogComponent implements OnInit {

  GtDetailsViewLogRes: GtDetailsViewLog_ApiResponse;
  GtDetailsViewLog: GtDetailsViewLog_Data;

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  ngOnInit() {
    this.GtDetails_ViewLog()
  }

  GtDetails_ViewLog() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.GtDetails_ViewLog(data).subscribe(
      (res: GtDetailsViewLog_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsViewLogRes = res;
          this.GtDetailsViewLog = JSON.parse(JSON.stringify(this.GtDetailsViewLogRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          })
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        })
      }
    );
  }

}
