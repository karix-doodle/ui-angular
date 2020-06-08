import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtFileAuditFileLog_ApiResponse, GtFileAuditFileLog_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gt-file-audit-log-view',
  templateUrl: './gt-file-audit-log-view.component.html',
  styleUrls: ['./gt-file-audit-log-view.component.css']
})
export class GtFileAuditLogViewComponent implements OnInit {

  gatewayFileAuditFileLogDataRes: GtFileAuditFileLog_ApiResponse;
  gatewayFileAuditFileLogData: GtFileAuditFileLog_Data;

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService,
  ) { }

  ngOnInit() {
    this.GtFileAuditFileLog_list();
  }

  GtFileAuditFileLog_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      ga_name: this.activeRoute.snapshot.params.name,
      uuid: this.activeRoute.snapshot.params.uuid,
    }
    this.gatewayManagementService.GtFileAuditFileLog_list(data).subscribe(
      (res: GtFileAuditFileLog_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayFileAuditFileLogDataRes = res;
          this.gatewayFileAuditFileLogDataRes.data.gw_name = this.activeRoute.snapshot.params.name
          this.gatewayFileAuditFileLogData = JSON.parse(JSON.stringify(this.gatewayFileAuditFileLogDataRes));
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
