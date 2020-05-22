import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-group-stepper-form',
  templateUrl: './group-stepper-form.component.html',
  styleUrls: ['./group-stepper-form.component.css']
})
export class GroupStepperFormComponent implements OnInit {
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,config: NgbModalConfig) {}
 
  ngOnInit() {
     this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
     });
     this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
   });
  }

}
