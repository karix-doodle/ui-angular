import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PoolRouteRoutingModule } from './pool-route-routing.module';
import { PoolRouteComponent } from './pool-route.component';
import { CreatePoolComponent } from './create-pool/create-pool.component';
import { PoolRouteListComponent } from './pool-route-list/pool-route-list.component';
import { RouteStepperFormComponent } from './route-stepper-form/route-stepper-form.component';
import { PrActWiseViewComponent } from './pr-act-wise-view/pr-act-wise-view.component';


@NgModule({
  declarations: [PoolRouteComponent, CreatePoolComponent, PoolRouteListComponent, RouteStepperFormComponent, PrActWiseViewComponent],
  imports: [
    CommonModule,
    PoolRouteRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule, MatInputModule, MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouteStepperFormComponent]

})
export class PoolRouteModule { }
