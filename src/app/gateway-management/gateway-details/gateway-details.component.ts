import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetails_ApiResponse, GtDetails_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.css']
})
export class GatewayDetailsComponent implements OnInit {
  GtDetailsDataRes: GtDetails_ApiResponse;
  GtDetailsData: GtDetails_Data;

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.GatewayDetails_view();
  }

  GatewayDetails_view() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
    }
    this.gatewayManagementService.GatewayDetails_view(data).subscribe(
      (res: GtDetails_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsDataRes = res;
          this.GtDetailsData = JSON.parse(JSON.stringify(this.GtDetailsDataRes));
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
