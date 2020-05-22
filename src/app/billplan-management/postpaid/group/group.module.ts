import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupStepperFormComponent } from './group-stepper-form/group-stepper-form.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';


@NgModule({
  declarations: [GroupComponent, GroupStepperFormComponent, CreateRatecardComponent, AssignedRatecardViewComponent],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    GroupRoutingModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
