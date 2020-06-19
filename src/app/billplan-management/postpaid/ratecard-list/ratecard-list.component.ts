import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CreateAssignRateCardService } from '../../services/BillManagement/CreateAssignRateCard/create-assign-rate-card.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RateCardSearchRes, RateCardList } from '../../models/CreateAssignRateCard/createAssignRateCard.model';
import { HttpErrorResponse } from '@angular/common/http';
import { errorAlert } from '../../../shared/sweet-alert/sweet-alert';

@Component({
  selector: 'app-ratecard-list',
  templateUrl: './ratecard-list.component.html',
  styleUrls: ['./ratecard-list.component.css']
})
export class RatecardListComponent implements OnInit {
  rateCardType = 'country';
  rateCardSearchForm: FormGroup;
  rateCardNameList: RateCardList[]
  constructor(
    private formBuilder: FormBuilder,
    private createAssignRateCardService: CreateAssignRateCardService
  ) { }

  ngOnInit() {
    this.initRateCardSearchForm();
    this.initSearchSuggestion();
  }
  initRateCardSearchForm() {
    this.rateCardSearchForm = this.formBuilder.group({
      loggedinusername: [environment.loggedinusername, Validators.required],
      loggedinempid: [environment.loggedinempid, Validators.required],
      ratecardtype: ['country', Validators.required],
      ratecardname: ['', Validators.required],
    });
  }
  initSearchSuggestion() {
    const form = this.rateCardSearchForm;
    form.get('ratecardname').valueChanges.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(query => this.createAssignRateCardService.getRateCardNameSuggestion(this.rateCardSearchForm.value))
    ).subscribe((res: RateCardSearchRes) => {
      if (res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code) {
        // console.log(res);
        this.rateCardNameList = res.data;
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
    // console.log(RateCard);
    this.rateCardSearchForm.get('ratecardname').patchValue(
      RateCard.ratecard_name, { onlySelf: true }
    );
  }
}
