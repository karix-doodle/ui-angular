import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryModule } from '../country/country.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CountryOperatorRoutingModule } from './country-operator-routing.module';
import { CountryOperatorComponent } from './country-operator.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CountryOperatorStepperFormComponent } from './country-operator-stepper-form/country-operator-stepper-form.component';


@NgModule({
  declarations: [CountryOperatorComponent, CreateRatecardComponent, AssignedRatecardViewComponent, CountryOperatorStepperFormComponent],
  imports: [
    CommonModule,
    CountryModule,
    NgbModule,
    BrowserModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, 
    CountryOperatorRoutingModule
  ]
})
export class CountryOperatorModule { }
