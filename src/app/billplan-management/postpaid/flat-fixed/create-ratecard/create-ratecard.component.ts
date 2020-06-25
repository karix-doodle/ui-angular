import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillplanFlatFixedService } from 'src/app/billplan-management/services/BillManagement/billplan-country-flat-fixed/billplan-flat-fixed.service';
import { BillPlanCreateFlatFixed_ApiResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {
Submitted = false
  fixedRateFrom: FormGroup
  billplan_id
  billplan_currencyid
  ratecard_name
  ratecard_type="flat-fixed"

  constructor( private formBuilder: FormBuilder,
    private billplanflat: BillplanFlatFixedService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.billplan_id = +this.activeRoute.snapshot.params.bId
      this.billplan_currencyid = +this.activeRoute.snapshot.params.cId
      this.ratecard_name = this.activeRoute.snapshot.params.name
    }

  ngOnInit() {
  this.fixedRateFrom = this.formBuilder.group({
    billplan_id:  +this.activeRoute.snapshot.params.bId,
    billplan_currencyid:+this.activeRoute.snapshot.params.cId,
    ratecard_name:this.activeRoute.snapshot.params.name,
    ratecard_type:['flat-fixed'],
    billing_rate:['',[Validators.required, Validators.pattern('[0-9.]{6,6}')]],
    normalize_rate:[''],
    discount_rate:[''],
    discount_type:['percentage'],
    description:['']
  })

  }

  get control() {
    return this.fixedRateFrom.controls;
  }

  round(data) {
    return data * 0.785
  }


  onSubmit(){
    console.log(this.fixedRateFrom.value)
    this.Submitted = true
    if(this.fixedRateFrom.valid){
      this.billplanflat.BillPlanCreate(this.fixedRateFrom.value).subscribe(
        (res: BillPlanCreateFlatFixed_ApiResponse) => {
           if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
              successAlert(res.message, res.responsestatus)
              this.router.navigate(['billplan-management']);
           } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
              errorAlert(res.message, res.responsestatus)
           }
        }, (error: HttpErrorResponse) => {
           errorAlert(error.message, error.statusText)
        }
     );
    }
  }

}
