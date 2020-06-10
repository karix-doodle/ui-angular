import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtESMEAddrRouted_ApiResponse, GtESMEAddrRouted_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gt-esmeaddr-route',
  templateUrl: './gt-esmeaddr-route.component.html',
  styleUrls: ['./gt-esmeaddr-route.component.css']
})
export class GtESMEAddrRoutedComponent implements OnInit {

  GtESMEAddrRoutedDataRes: GtESMEAddrRouted_ApiResponse;
  GtESMEAddrRoutedData: GtESMEAddrRouted_Data;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.GtESMEAddrRouted_list()
  }

  GtESMEAddrRouted_list() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name,
    }
    this.gatewayManagementService.GtESMEAddrRouted_list(data).subscribe(
      (res: GtESMEAddrRouted_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtESMEAddrRoutedDataRes = res;
          this.GtESMEAddrRoutedData = JSON.parse(JSON.stringify(this.GtESMEAddrRoutedDataRes));
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          })
        }
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        })
      }
    );
  }

}
