import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtDetailsCountryList_ApiResponse, GtDetailsCountryList_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gt-countrylist',
  templateUrl: './gt-countrylist.component.html',
  styleUrls: ['./gt-countrylist.component.css']
})
export class GtCountrylistComponent implements OnInit {
  sendTestMsg: any[] = [1, 2, 3];

  GtDetailsCountryListRes: GtDetailsCountryList_ApiResponse;
  GtDetailsCountryList: GtDetailsCountryList_Data;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  close(pop: any) {
    pop.close()
  }

  openPopup(pop: any) {
    pop.open()
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.Gateway_CountryList();
  }

  Gateway_CountryList() {
    let data = {
      gw_id: this.activeRoute.snapshot.params.id,
      gw_name: this.activeRoute.snapshot.params.name
    }
    this.gatewayManagementService.Gateway_CountryList(data).subscribe(
      (res: GtDetailsCountryList_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.GtDetailsCountryListRes = res;
          this.GtDetailsCountryList = JSON.parse(JSON.stringify(this.GtDetailsCountryListRes));
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
