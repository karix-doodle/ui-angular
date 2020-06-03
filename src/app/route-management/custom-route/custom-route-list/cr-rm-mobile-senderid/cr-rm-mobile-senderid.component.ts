import { Component, OnInit } from '@angular/core';
import { CustomService } from 'src/app/route-management/services/RouteManagement/custom-route/custom.service';
import { MobileSenderidCustomService } from 'src/app/route-management/services/RouteManagement/custom-route/mobile-custom-senderid.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { MobileCustomSenderId_ApiResponse, MobileSenderList_Data, MobileCustomSender_Data } from 'src/app/route-management/models/custom.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cr-rm-mobile-senderid',
  templateUrl: './cr-rm-mobile-senderid.component.html',
  styleUrls: ['./cr-rm-mobile-senderid.component.css']
})
export class CrRmMobileSenderidComponent implements OnInit {
  constructor(public mobileSenderidCustomService: MobileSenderidCustomService,
              public customService: CustomService,
              public toastr: ToastrManager) { }

  mobileSenderidCustomData: MobileCustomSender_Data;
  mobileSenderidApiResponse: MobileCustomSenderId_ApiResponse;

  searchvalue: any;

  sortingName: any;
  isDesc: boolean;

  ngOnInit() {
    this.getAllMobileSenderidData();
  }

  /**
   * @description gets all the mobile custom route data
   */
  getAllMobileSenderidData() {
    this.mobileSenderidCustomService.getCustomMobileSenderidList().subscribe((res: MobileCustomSenderId_ApiResponse) => {
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.mobileSenderidApiResponse = res;
        this.mobileSenderidCustomData = res.data;
      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        Swal.fire({
          icon: 'error',
          title: res.responsestatus,
          text: res.responsestatus,
        });
      }
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: error.statusText,
        text: error.message,
      });
    });

  }

  /**
   *
   * @param mobilesenderData consists of mobile and senderid custom data to delete
   * @description deletes the selected mobile sender custom route data in table
   */
  deleteMobileCustom(mobilesenderData) {
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
          senderid: mobilesenderData.senderid,
          id: mobilesenderData.id, mobile: mobilesenderData.mobile, username: '1234'
        };
        this.mobileSenderidCustomService.deleteCustomMobileSenderid(mobileData).subscribe((data: any) => {
          if (data.responsestatus === 'failure') {
            this.toastr.errorToastr(data.message, '', { position: 'bottom-right' });
          } else {
            this.toastr.successToastr(data.message, '', { position: 'bottom-right' });
            this.getAllMobileSenderidData();
          }
        });
      }
    });
  }

  sort(name: string): void {
    if (name && this.sortingName !== name) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = name;
  }

}
