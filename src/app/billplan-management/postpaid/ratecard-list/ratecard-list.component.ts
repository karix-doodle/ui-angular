import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CreateAssignRateCardService, } from '../../services/BillManagement/CreateAssignRateCard/create-assign-rate-card.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {
  RateCardSearchRes,
  RateCardList,
  DeleteRatecardRes,
  BillPlanDetailsView_ApiResponse,
  BillPlanDetailsView_Data,
  AssigendRateCard_ApiResponse
} from '../../models/CreateAssignRateCard/createAssignRateCard.model';
import { HttpErrorResponse } from '@angular/common/http';
import { errorAlert, confirmAlert, successAlert } from '../../../shared/sweet-alert/sweet-alert';
import { Subject } from 'rxjs';

import * as moment from 'moment';
import { BillManagementService } from '../../services/BillManagement/billplan-management.service';
import { GetNameCheck_ApiResponse } from '../../models/BillManagement/blillplan.models';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';
import { BillplanMgmt } from '../../../model/authorization.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-ratecard-list',
  templateUrl: './ratecard-list.component.html',
  styleUrls: ['./ratecard-list.component.css']
})
export class RatecardListComponent implements OnInit {

  rateCardSearchForm: FormGroup;
  rateCardNameList: RateCardList[];

  billPlanDetailsViewDataRes: BillPlanDetailsView_ApiResponse;
  billPlanDetailsViewData: BillPlanDetailsView_Data;

  public params: any;
  handleDateParams: Subject<[any]> = new Subject<[any]>();

  billPlanMgmtAuthControls: BillplanMgmt;

  effective_date: string;

  rateCardValid: boolean = false
  showdropdown: boolean = false
  ratecardName: string = '';
  cardName: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private createAssignRateCardService: CreateAssignRateCardService,
    private billplanListService: BillManagementService,
    private authorizationService: AuthorizationService
  ) {
    this.billPlanMgmtAuthControls = this.authorizationService.authorizationState.billplan_mgmt;

    this.params = {
      type: 'dateOnly',
      startdate: moment().utcOffset(environment.UTC).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(0, "days"),
    }
  }

  ngOnInit() {
    this.initRateCardSearchForm();
    this.initSearchSuggestion();
    this.billPlanDetailsView();
    this.activeRoute.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('name')) {
        this.setRateCardName(params.name);
      } else {
        this.setRateCardName('');
      }
    });
  }
  setRateCardName(rateCardname) {
    this.cardName = rateCardname;
  }
  initRateCardSearchForm() {
    let ratecardnamePattern = '[0-9a-zA-Z !@#$%^&*()_+-=:;"<>/?{}\'.,/\n/\r/\t/\s]{5,100}';
    this.rateCardSearchForm = this.formBuilder.group({
      billplanid: ['', Validators.required],
      ratecardid: [''],
      currencyid: [''],
      effectdate: [moment().utcOffset(environment.UTC).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, "days"), Validators.required],
      ratecardtype: ['', Validators.required],
      ratecardname: [''
        , [Validators.required, Validators.pattern(ratecardnamePattern)]],
    });
  }

  billPlanDetailsView() {
    let data = {
      billplanid: this.activeRoute.snapshot.params.id
    }
    this.createAssignRateCardService.BillPlanDetailsView(data).subscribe(
      (res: BillPlanDetailsView_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.billPlanDetailsViewDataRes = res;
          this.billPlanDetailsViewData = JSON.parse(JSON.stringify(this.billPlanDetailsViewDataRes));
          let days:number = 0;
          if(_.isUndefined(this.billPlanDetailsViewData.data.tabledata) || _.isNull(this.billPlanDetailsViewData.data.tabledata) || _.size(this.billPlanDetailsViewData.data.tabledata) == 0){
            // this is first ratecard, hence allow todays date to be selected in calander
            days = 0;
          }else{
            days = 1;
          }

          this.rateCardSearchForm.patchValue({
            billplanid: this.billPlanDetailsViewData.data.billplanid,
            currencyid: this.billPlanDetailsViewData.data.currency_id,
            ratecardtype: this.billPlanDetailsViewData.data.ratecardtype ? this.billPlanDetailsViewData.data.ratecardtype : '',
            effectdate: moment().utcOffset(environment.UTC).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(days, "days")
            // ratecardname: this.rateCardName !== undefined ? this.ratecardName : ''
          });
          this.params.startdate = moment().utcOffset(environment.UTC).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(days, "days");
          this.handleDateParams.next([this.params]);

        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText)
      }, () => {
        this.rateCardSearchForm.get('ratecardname').patchValue(this.cardName);
      }
    );
  }

  initSearchSuggestion() {
    const form = this.rateCardSearchForm;
    form.get('ratecardname').valueChanges.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(query => this.createAssignRateCardService.getRateCardNameSuggestion(form.value))
    ).subscribe((res: RateCardSearchRes) => {
      if (this.ratecardName != form.value.ratecardname) {
        this.rateCardSearchForm.patchValue({
          ratecardid: ''
        })
        this.showdropdown = true;
      }
      if (res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code) {
        this.rateCardNameList = res.data;
        if (this.cardName !== undefined && this.cardName !== '') {
          this.rateCardNameList.forEach(element => {
            if (element.ratecard_name === this.cardName) {
              this.rateCardSearchForm.patchValue({
                ratecardid: element.ratecard_id
              });
              this.showdropdown = false;
            }
          });
         // this.cardName = undefined;
          this.cardName = '';
        }
      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        this.rateCardNameList = [];
        errorAlert(res.message, res.responsestatus);
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText);
    });
  }

  onSelectRateCardName(RateCard: RateCardList) {
    this.rateCardSearchForm.patchValue({
      ratecardname: RateCard.ratecard_name,
      ratecardid: RateCard.ratecard_id
    })
    this.ratecardName = RateCard.ratecard_name
    this.showdropdown = false
  }

  delete(billplanid, ratecardid, id) {
    let data = {
      billplanid: billplanid,
      ratecardid: ratecardid,
      id:id
    }
    confirmAlert(`You won't be able to revert !`)
      .then((result) => {
        if (result.isConfirmed) {
          this.createAssignRateCardService.deleteRateCardFormBillPlan(data).subscribe(
            (res: DeleteRatecardRes) => {
              if (res.responsestatus === environment.APIStatus.success.text &&
                res.responsecode > environment.APIStatus.success.code) {
                this.billPlanDetailsView();
              } else if (
                res.responsestatus === environment.APIStatus.error.text &&
                res.responsecode < environment.APIStatus.error.code
              ) {
                errorAlert(res.message, res.responsestatus);
              }
            }, (error: HttpErrorResponse) => {
              errorAlert(error.message, error.statusText);
            }
          );
        }
      });
  }

  onrateCardSearchFormSubmit(data) {
    if (data.ratecardid == '') {
      if (this.billPlanMgmtAuthControls.billplan_create_ratecard_enabled) {
        this.nameCheck(data);
      }
    } else {
      if (this.billPlanMgmtAuthControls.billplan_assign_ratecard_enabled) {
        this.assignRatecard(data);
      }
    }
  }

  nameCheck(data) {
    this.rateCardValid = true;
    if (this.rateCardSearchForm.invalid) {
      return;
    } else {
      this.rateCardValid = false;
      this.billplanListService.GetNameCheck(data.ratecardname, 'ratecard').subscribe(
        (res: GetNameCheck_ApiResponse) => {
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            this.createRatecard(data);
          } else if (
            res.responsestatus === environment.APIStatus.error.text &&
            res.responsecode < environment.APIStatus.error.code
          ) {
            errorAlert(res.message, res.responsestatus);
          }
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
    }
  }

  getDateSelection(e) {
    //let startDate = e.startDate;
    let startDate = e;
    this.effective_date = e;
    this.rateCardSearchForm.patchValue({
      effectdate: moment(startDate)
    })
  }

  assignRatecard(data) {
    this.rateCardValid = true;
    if (this.rateCardSearchForm.invalid) {
      return;
    } else {
      this.rateCardValid = false;
      // date format changing for some random request when it coming as moment obj, so converting it to string at calendar it self
      //data.effectdate = moment(data.effectdate).format('DD/MM/YYYY HH:mm:ss');
      data.effectdate = this.effective_date;
      this.createAssignRateCardService.assigendRateCard(data).subscribe(
        (res: AssigendRateCard_ApiResponse) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
            successAlert(res.message, res.responsestatus)
            this.billPlanDetailsView();
            this.resetForm();
          } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            errorAlert(res.message, res.responsestatus)
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText)
        }
      );
    }
  }

  createRatecard(data) {
    this.rateCardValid = true;
    if (this.rateCardSearchForm.invalid) {
      return;
    } else {
      let pageURL = '';
      switch (data.ratecardtype) {
        case 'country':
          pageURL = '/billplan-management/postpaid/country/create-ratecard/'
          break;
        case 'country-operator':
          pageURL = '/billplan-management/postpaid/country-operator/create-ratecard/'
          break;
        case 'flat-fixed':
          pageURL = '/billplan-management/postpaid/flat-fixed/create-ratecard/'
          break;
        case 'group':
          pageURL = '/billplan-management/postpaid/group/create-ratecard/'
          break;
        case 'slab':
          pageURL = '/billplan-management/postpaid/slab/create-ratecard/'
          break;
      }
      pageURL = pageURL + data.ratecardname + '/' + data.currencyid + '/' + data.billplanid;
      this.router.navigate([pageURL]);
    }
  }

  resetForm() {
    this.handleDateParams.next([this.params]);
    this.initRateCardSearchForm()
    this.initSearchSuggestion();
    this.rateCardSearchForm.patchValue({
      effectdate: moment().utcOffset(environment.UTC).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(1, "days")
    })
  }

}
