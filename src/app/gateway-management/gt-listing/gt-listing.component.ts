import { Component, OnInit } from '@angular/core';
import { GatewayManagementService } from '../services/gateway-management.service';
import { GtListing_ApiResponse, GtStatusupdate_ApiResponse, GtListing_TableDataList, GtListing_Data } from '../models/gateway-management.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-gt-listing',
  templateUrl: './gt-listing.component.html',
  styleUrls: ['./gt-listing.component.css']
})

export class GtListingComponent implements OnInit {
  gatewayDataRes: GtListing_ApiResponse;
  gatewayData: GtListing_Data;
  selectedType: GtListing_TableDataList[];
  sortingName: string;
  isDesc: boolean;

  constructor(
    private gatewayManagementService: GatewayManagementService,
  ) { }

  ngOnInit() {
    this.GtListing_list();
  }

  downloadGatewayFile() {
    this.GtListing_download();
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
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: error.statusText,
          text: error.message,
        })
      }
    );
  }

  GtListing_download() {
    this.gatewayManagementService.GtListing_download().subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'GatewayListdata-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
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
      this.gatewayData.data.tabledata = this.selectedType;
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
          }, (error: HttpErrorResponse) => {
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

  /**
   *
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }

}
