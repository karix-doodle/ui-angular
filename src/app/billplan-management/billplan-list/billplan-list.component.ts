import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillPlanTableList_ApiResponse, BillPlanTableList_Data } from '../models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { BillManagementService } from '../services/BillManagement/billplan-management.service';
@Component({
  selector: 'app-billplan-list',
  templateUrl: './billplan-list.component.html',
  styleUrls: ['./billplan-list.component.css']
})
export class BillplanListComponent implements OnInit {
  'billingType'="postpaid";
  searchvalue: "";
  sortingName: string;
  isDesc: boolean;
billplanTbaleListApiResponse: BillPlanTableList_ApiResponse
billplanTableListData: BillPlanTableList_Data[] =[];
tablelist:BillPlanTableList_Data[] = [];
  constructor(config: NgbModalConfig,
     private modalService: NgbModal,
     private billplanListService: BillManagementService)
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {

this.getBillPlanTabelData();
  }

  getBillPlanTabelData() {
    this.billplanListService.getBillPlanMgmtTableList().subscribe(
      (res: BillPlanTableList_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.billplanTbaleListApiResponse = res;
          this.billplanTableListData = Array.from(this.billplanTbaleListApiResponse.data.tabledata)
          console.log(this.billplanTableListData[0].id);




        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.responsestatus);
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }

  BillPlanListDownload() {
    this.billplanListService.BillPlanListdownload().subscribe(
      (res: any) => {
        let blob = new Blob([res], { type: 'text/csv' });
        let fileName = 'BillPlanListData-' + new Date().toLocaleString()
        saveAs(blob, fileName + ".csv");
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }
    );
  }


  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }

}
