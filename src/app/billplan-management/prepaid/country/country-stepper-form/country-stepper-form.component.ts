import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-country-stepper-form',
  templateUrl: './country-stepper-form.component.html',
  styleUrls: ['./country-stepper-form.component.css']
})
export class CountryStepperFormComponent implements OnInit {
   firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   constructor(private _formBuilder: FormBuilder,config: NgbModalConfig) {}

   ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
         firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
         secondCtrl: ['', Validators.required]
      });
   }

}
