import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-slab-stepper-form',
  templateUrl: './slab-stepper-form.component.html',
  styleUrls: ['./slab-stepper-form.component.css']
})
export class SlabStepperFormComponent implements OnInit {

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
