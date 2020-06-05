import { Component, OnInit } from '@angular/core';
import { SenderCustomApiResponse, SenderCustomData } from 'src/app/route-management/models/custom.model';
import { SenderCustomService } from '../../../services/custom-route/sender-custom.service';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cr-rm-senderid',
  templateUrl: './cr-rm-senderid.component.html',
  styleUrls: ['./cr-rm-senderid.component.css']
})
export class CrRmSenderidComponent implements OnInit {
  senderidCustomData: SenderCustomData;
  senderidApiResponse: SenderCustomApiResponse;

  searchvalue: any;

  sortingName: any;
  isDesc: boolean;

  constructor(public senderService: SenderCustomService) { }

  ngOnInit() {
    this.getAllSenderidData();
  }

  /**
   * @description gets all the mobile custom route data
   */
  getAllSenderidData() {
    this.senderService.getCustomSenderidList().subscribe((res: SenderCustomApiResponse) => {
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.senderidApiResponse = res;
        this.senderidCustomData = res.data;
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
   * @param senderData consists of senderid custom data to delete
   * @description deletes the selected sender custom route data in table
   */
  deleteSenderCustom(senderData) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const senderidData = {
          senderid: senderData.senderid,
          id: senderData.id, username: '1234'
        };
        this.senderService.deleteCustomSenderid(senderidData).subscribe((data: any) => {
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
            this.getAllSenderidData();
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
