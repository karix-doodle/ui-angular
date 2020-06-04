import { Component, OnInit } from '@angular/core';
import {  MobileList_Data, MobileCustom_List, MobileCustom_ApiResponse } from 'src/app/route-management/models/custom.model';
import Swal from 'sweetalert2';
import { MobileCustomRouteService } from 'src/app/route-management/services/custom-route/mobile-custom-route.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cr-rm-mobile',
  templateUrl: './cr-rm-mobile.component.html',
  styleUrls: ['./cr-rm-mobile.component.css']
})
export class CrRmMobileComponent implements OnInit {

  constructor( public mobileCustomRoute: MobileCustomRouteService, public toastr: ToastrManager ) { }
  searchvalue: '';
  sortingName: string;
  isDesc: boolean;
  mobileCustomApiResponse: MobileCustom_ApiResponse;
  mobileCustomData: MobileCustom_List;

  ngOnInit() {
    this.getMobileCustomRoute();
  }

  /**
   * @description gets all the mobile custom route data
   */
  getMobileCustomRoute() {
    this.mobileCustomRoute.getCustomMobileList().subscribe((res: MobileCustom_ApiResponse) => {
      console.log(res);
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.mobileCustomApiResponse = res;
        this.mobileCustomData = res.data;
      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        Swal.fire({
          icon: 'error',
          text: res.responsestatus,
        });
      }
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        text: error.message,
      });
    });

  }

  /**
   *
   * @param mobilerouteData consists of mobile custom data to delete
   * @description deletes the selected mobile custom route data
   */
  deleteMobileCustom(mobilerouteData: MobileList_Data) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const mobileData = {
          id: mobilerouteData.id, mobile: mobilerouteData.mobile, username: '1234'
        };
        this.mobileCustomRoute.deleteCustomMobile(mobileData).subscribe((data: any) => {
          if (data.responsestatus === 'failure') {
            Swal.fire({
              icon: 'error',
              text: data.message,
            });
          } else {
            Swal.fire({
              icon: 'success',
              text: data.message,
            });
            this.getMobileCustomRoute();
          }
        });
      }
    });
  }

  /**
   *
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) { this.isDesc = false; } else { this.isDesc = !this.isDesc; }
    this.sortingName = tableHeaderName;
  }
}
