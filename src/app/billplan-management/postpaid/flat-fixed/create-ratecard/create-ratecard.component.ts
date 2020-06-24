import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillplanFlatFixedService } from 'src/app/billplan-management/services/BillManagement/billplan-country-flat-fixed/billplan-flat-fixed.service';
import { BillPlanCreateFlatFixed_ApiResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {

  fixedRateFrom: FormGroup
  billplan_id = 14
  billplan_currencyid = 2
  ratecard_name="mmmm"
  ratecard_type="flat-fixed"
  normalizeRate ="0.198"
  // {
  //   "loggedinusername": "string",
  //   "loggedinempid": 0,
  //   "billplan_id": 0,
  //   "billplan_currencyid": 0,
  //   "ratecard_name": "string",
  //   "ratecard_type": "string",
  //   "billing_rate": 0,
  //   "discount_rate": 0,
  //   "discount_type": "string",
  //   "description": "string"
  // }
  constructor( private formBuilder: FormBuilder,
    private billplanflat: BillplanFlatFixedService,
    private router: Router) { }

  ngOnInit() {
  this.fixedRateFrom = this.formBuilder.group({
    billplan_id: [this.billplan_id],
    billplan_currencyid:[this.billplan_currencyid],
    ratecard_name:[this.ratecard_name],
    ratecard_type:[this.ratecard_type],
    billing_rate:['',[Validators.required]],
    discount_rate:['', [Validators.required]],
    discount_type:['percentage',[Validators.required]],
    description:['']
  })

  }

  onSubmit(){
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
