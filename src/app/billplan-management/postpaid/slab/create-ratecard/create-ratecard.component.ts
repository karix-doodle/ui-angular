import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { SlabRouteService } from '../../../services/BillManagement/Slab/slab-route.service';
import { Countries } from '../../../models/BillManagement/Slab/slab.model';
import { Subject } from 'rxjs';
import { errorAlert, confirmAlert } from '../../../../shared/sweet-alert/sweet-alert';
import { ActivatedRoute, Params } from '@angular/router';
import { BillManagementService } from '../../../services/BillManagement/billplan-management.service';
import { BillPlanCurrency_ApiResponse } from '../../../models/BillManagement/blillplan.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {

  @ViewChild('tableRow', { static: false }) tableRow: ElementRef;
  SlabFormGroup: FormGroup;
  previewList: Countries[] = [];
  previewDeleteEvent: Subject<void> = new Subject<void>();
  editMode: Subject<[boolean, number, string]> = new Subject<[boolean, number, string]>();
  handlecurrencyList: Subject<[object]> = new Subject<[object]>();
  editModeStatus: boolean;
  countryCount: number;
  operatorCount: number;
  // paramsData: Params;
  billPlanCurrencyRes: BillPlanCurrency_ApiResponse;
  billPlanCurrencyData: BillPlanCurrency_ApiResponse;
  currencySybmol: object = {
    bCurrency: '',
    nCurrency: ''
  };
  searchvalue: any;
  constructor(
    private formBuilder: FormBuilder,
    private slabRouteService: SlabRouteService,
    private Route: ActivatedRoute,
    private billPlanservice: BillManagementService,
  ) {
    this.createSlabForm();
    this.initRouteParams();
  }

  ngOnInit() {
    this.slabRouteService.previewList = [];
    this.editModeStatus = false;
  }
  getBillPlanCurrency() {
    this.billPlanservice.BillPlancurrency().subscribe(
      (res: BillPlanCurrency_ApiResponse) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          // console.log(res);
          this.billPlanCurrencyRes = res;
          this.billPlanCurrencyData = JSON.parse(JSON.stringify(this.billPlanCurrencyRes));
          let bcurrency = {};
          let ncurrency = {};
          // console.log(this.SlabFormGroup.value.billplan_currencyid);
          this.billPlanCurrencyRes.data.filter((item) => {
            if (item.currency_id === this.SlabFormGroup.value.billplan_currencyid) {
              bcurrency = {
                symbol: item.currency_symbol,
                id: item.currency_id
              };
            }
            if (item.currency_id === environment.currencyDefault) {
              ncurrency = {
                symbol: item.currency_symbol,
                id: item.currency_id
              };
            }
          });

          this.currencySybmol = {
            bCurrency: bcurrency,
            nCurrency: ncurrency
          };
          // console.log(this.currencySybmol);

          this.handlecurrencyList.next([this.currencySybmol]);

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

  initRouteParams() {
    this.Route.params.subscribe((data: Params) => {
      // console.log(data);
      // this.paramsData = data;
      this.SlabFormGroup.patchValue({
        billplan_id: +data.bId,
        billplan_currencyid: +data.cId,
        ratecard_name: data.name,
      });
      this.getBillPlanCurrency();
    }, error => {

    }, () => {

    });
  }
  private createSlabForm() {
    this.SlabFormGroup = this.formBuilder.group({
      loggedinusername: [environment.loggedinusername],
      loggedinempid: [environment.loggedinempid],
      billplan_id: ['2'],
      billplan_currencyid: [13],
      ratecard_type: ['slab'],
      ratecard_name: ['slabTest10'],
      continent_name: [''],
      country_name: ['', [Validators.required]],
      operator_name: ['', [Validators.required]],
      mcc: [''],
      mnc: [''],
      slabs: this.formBuilder.array([this.createSlabsItem()])
    });
  }
  createSlabsItem(): FormGroup {
    return this.formBuilder.group({
      min: [1],
      max: [999999999, [Validators.required, Validators.min(2), Validators.max(999999999)]],
      billing_rate: ['', [Validators.required, Validators.pattern('^([0-9]+(\.[0-9]+)?)')]],
      normalize_rate: ['']
    });
  }
  get firstFormArray(): FormArray {
    return this.slabRouteService.formArray(this.SlabFormGroup, 'slabs');
  }
  listenAddNew(list) {
    // console.log(list);
    this.editModeStatus = false;
    this.previewList = this.slabRouteService.previewList;
    this.countryCount = this.slabRouteService.count('country_name');
    this.operatorCount = this.slabRouteService.count('operator_name');
    this.onScrollDown();
  }
  onScrollDown(): void {
    setTimeout(() => {
      this.tableRow.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }
  editPreviewSlabs(listIndex, countryName) {
    // console.log(listIndex);
    this.editModeStatus = true;
    this.editMode.next([true, listIndex, countryName]);
    this.SlabFormGroup.patchValue({
      continent_name: this.slabRouteService.previewList[listIndex].continent_name,
      country_name: this.slabRouteService.previewList[listIndex].country_name,
      operator_name: this.slabRouteService.previewList[listIndex].operator_name,
      mcc: this.slabRouteService.previewList[listIndex].mcc,
      mnc: this.slabRouteService.previewList[listIndex].mnc,
      slabs: this.slabRouteService.previewList[listIndex].slabs
    });
    // console.log();
    const slabs = this.firstFormArray;
    slabs.clear();
    this.slabRouteService.previewList[listIndex].slabs.forEach(slab => {
      slabs.push(
        this.formBuilder.group({
          min: slab.min,
          max: slab.max,
          billing_rate: slab.billing_rate,
          normalize_rate: slab.normalize_rate
        })
      );
    });
  }
  deletePreviewSlabs(listIndex) {
    // console.log(listIndex);
    if (!this.editModeStatus) {
      confirmAlert().then((result) => {
        if (result.isConfirmed) {
          this.slabRouteService.previewList.splice(listIndex, 1);
          this.previewDeleteEvent.next();
        }
      });
    } else {
      errorAlert('You are in edit mode', 'Warning');
    }
  }
}
