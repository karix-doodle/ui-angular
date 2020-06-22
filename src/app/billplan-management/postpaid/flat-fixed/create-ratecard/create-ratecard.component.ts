import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor( private formBuilder: FormBuilder) { }

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
      console.log(this.fixedRateFrom.value,'23456')
    }
  }

}
