import { Component, OnInit } from '@angular/core';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtTimeZone_ApiResponse, GtTimeZone_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-gateway',
  templateUrl: './create-gateway.component.html',
  styleUrls: ['./create-gateway.component.css']
})
export class CreateGatewayComponent implements OnInit {

  gatewayTimeZoneDataRes: GtTimeZone_ApiResponse;
  gatewayTimeZoneData: GtTimeZone_Data;

  constructor(
    private gatewayManagementService: GatewayManagementService,
  ) { }

  ngOnInit() {
    this.Gateway_timezone();
  }

  Gateway_timezone() {
    this.gatewayManagementService.Gateway_timezone().subscribe(
      (res: GtTimeZone_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayTimeZoneDataRes = res;
          this.gatewayTimeZoneData = JSON.parse(JSON.stringify(this.gatewayTimeZoneDataRes));
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
