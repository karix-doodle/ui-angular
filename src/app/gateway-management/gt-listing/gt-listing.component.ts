import { Component, OnInit } from '@angular/core';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtListing_ApiResponse, GtStatusupdate_ApiResponse, GtListing_TableDataList, GtListing_Data } from '../models/gateway-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gt-listing',
  templateUrl: './gt-listing.component.html',
  styleUrls: ['./gt-listing.component.css']
})

export class GtListingComponent implements OnInit {
  gatewayDataRes: GtListing_ApiResponse;
  gatewayData: GtListing_Data;
  selectedType: GtListing_TableDataList[];
  tabledata: GtListing_Data;

  constructor(
    private gatewayManagementService: GatewayManagementService
  ) { }

  ngOnInit() {
    this.GtListing_list();
  }

  GtListing_list() {
    this.gatewayManagementService.GtListing_list().subscribe(
      (res: GtListing_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.gatewayDataRes = res;
          this.gatewayData = JSON.parse(JSON.stringify(this.gatewayDataRes));
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

  selectType(type) {
    if (type === 'All') {
      this.gatewayData = JSON.parse(JSON.stringify(this.gatewayDataRes));
    } else {
      this.selectedType = this.gatewayDataRes.data.tabledata.filter(item => item.gw_type === type);
      this.gatewayDataRes.data.tabledata = this.selectedType;
    }
  }

  handleStatus(id, name, status) {
    let data = {
      gw_id: id,
      gw_name: name,
      status: status == true ? 0 : 1,
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.gatewayManagementService.GtListing_statusupdate(data).subscribe(
          (res: GtStatusupdate_ApiResponse) => {
            if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              Swal.fire({
                icon: 'success',
                title: res.responsestatus,
                text: res.message,
              })
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
      } else {
        this.GtListing_list();
      }
    })

  }
}
