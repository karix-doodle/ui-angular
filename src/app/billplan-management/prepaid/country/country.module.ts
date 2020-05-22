import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { CountryStepperFormComponent } from './country-stepper-form/country-stepper-form.component';


@NgModule({
  declarations: [CountryComponent, AssignedRatecardViewComponent, CreateRatecardComponent, CountryStepperFormComponent],
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
    CountryRoutingModule
  ]
})
export class CountryModule { }
