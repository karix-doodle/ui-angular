import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-route-stepper-form',
  templateUrl: './route-stepper-form.component.html',
  styleUrls: ['./route-stepper-form.component.css']
})
export class RouteStepperFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,config: NgbModalConfig, private modalService: NgbModal) {}
  
  open(content) {
   this.modalService.open(content, 
       { windowClass: 'gt-preview-modal'}
      );
   }
 
  ngOnInit() {
     this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
     });
  }

}
