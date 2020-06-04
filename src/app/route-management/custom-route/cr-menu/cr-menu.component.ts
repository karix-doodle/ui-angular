import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../services/custom-route/custom.service';
import {
  CustomSummary_Data,
  CustomSummary_ApiResponse,
} from '../../models/custom.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cr-menu',
  templateUrl: './cr-menu.component.html',
  styleUrls: ['./cr-menu.component.css'],
})
export class CrMenuComponent implements OnInit {
  customSummaryApiResponse: CustomSummary_ApiResponse;
  customSummaryData: CustomSummary_Data;

  constructor(public customService: CustomService) {}

  ngOnInit() {
    this.getSummaryData();
  }

  getSummaryData() {
    this.customService.getCustomRouteSummary().subscribe(
      (res: CustomSummary_ApiResponse) => {
        console.log(res);
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.customSummaryApiResponse = res;
          this.customSummaryData = res.data;
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
      }
    );
  }
}
