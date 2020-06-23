import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {
  BillPlanTableList_ApiResponse,
  BillPlanTableList_Data,
  BillPlanCurrency_ApiResponse,
  BillPlanCurrency_Data,
  CreateBillPlan_ApiResponse,
  GetNameCheck_ApiResponse
} from '../models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert, infoAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { BillManagementService } from '../services/BillManagement/billplan-management.service';

@Component({
  selector: 'app-billplan-list',
  templateUrl: './billplan-list.component.html',
  styleUrls: ['./billplan-list.component.css']
})

export class BillplanListComponent implements OnInit {
  billingType = "Postpaid";
  searchvalue: "";
  sortingName: string;
  isDesc: boolean;
  isCreateValid: boolean = false;
  isNameCheck: boolean = false;
  currency_id = environment.currencyDefault;

  billplanTbaleListApiResponse: BillPlanTableList_ApiResponse;
  billplanTableListData: BillPlanTableList_Data[] = [];
  tablelist: BillPlanTableList_Data[] = [];

  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_Data;

  createBillPlanRes: CreateBillPlan_ApiResponse;
  getNameCheckRes: GetNameCheck_ApiResponse;

  createBillPlanFormGroup: FormGroup;

  cardTypeObj = {}

  postpaidType = [{ item: "Country", value: 'country' },
  { item: "Country + operator", value: 'country-operator' },
  { item: "Flat / Fixed", value: 'flat-fixed' },
  { item: "Group", value: 'group' },
  { item: "Slab", value: 'slab' }];
  prepaidType = [{ item: "Country", value: 'country' },
  { item: "Country + operator", value: 'country-operator' },
  { item: "Flat / Fixed", value: 'flat-fixed' }];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private billplanListService: BillManagementService,
    private formBuilder: FormBuilder,
  ) {
    this.cardTypeObj['Postpaid'] = this.postpaidType
    this.cardTypeObj['Prepaid'] = this.prepaidType

    this.initialBillPlanGroup();
  }

  initialBillPlanGroup() {
    let billplan_name = '[0-9a-zA-Z]{5,20}';
    this.createBillPlanFormGroup = this.formBuilder.group({
      billplan_name: new FormControl('', [Validators.required, Validators.pattern(billplan_name)]),
      currency_id: new FormControl('', [Validators.required]),
      billing_type: new FormControl('', [Validators.required]),
      ratecard_type: new FormControl('', [Validators.required]),
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.getBillPlanTabelData();
    this.getBillPlanCurrency();
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

  getBillPlanCurrency() {
    this.billplanListService.BillPlancurrency().subscribe(
      (res: BillPlanCurrency_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.billPlanCurrencyRes = res;
          this.billPlanCurrencyData = JSON.parse(JSON.stringify(this.billPlanCurrencyRes));
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

  nameCheck(data) {
    if (data != '') {
      this.billplanListService.GetNameCheck(data, true).subscribe(
        (res: GetNameCheck_ApiResponse) => {
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            this.getNameCheckRes = res;
            this.createBillPlanFormGroup.get('billplan_name').markAsPristine();
            this.isNameCheck = false
          } else if (
            res.responsestatus === environment.APIStatus.error.text &&
            res.responsecode < environment.APIStatus.error.code
          ) {
            this.isNameCheck = true
            this.createBillPlanFormGroup.get('billplan_name').markAsDirty()
          }
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
    }
  }

  onSubmitCreateBillPlan(data) {
    this.isCreateValid = true;
    if (this.createBillPlanFormGroup.invalid || !this.createBillPlanFormGroup.pristine) {
      return;
    } else {
      this.isCreateValid = false;
      this.billplanListService.createBillPlan(data).subscribe(
        (res: CreateBillPlan_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            successAlert(res.message, res.responsestatus)
            this.closeCBP()
            if (data.billing_type == 'Postpaid') {
              // this.router.navigate(['billplan-management-postpaid']);
            } else {
              // this.router.navigate(['billplan-management-prepaid']);
            }
          } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            errorAlert(res.message, res.responsestatus)
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText)
        }
      );
    }
  }


  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }

  closeCBP() {
    this.isCreateValid = false;
    this.initialBillPlanGroup()
    this.modalService.dismissAll()
  }

}
