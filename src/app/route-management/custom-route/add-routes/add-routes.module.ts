import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddRoutesRoutingModule } from './add-routes-routing.module';
import { AddRoutesComponent } from './add-routes.component';
import { MobileRouteComponent } from './mobile-route/mobile-route.component';
import { SenderidTemplateRouteComponent } from './senderid-template-route/senderid-template-route.component';
import { SenderidMobileRouteComponent } from './senderid-mobile-route/senderid-mobile-route.component';
import { CountryOperatorRouteComponent } from './country-operator-route/country-operator-route.component';


@NgModule({
  declarations: [AddRoutesComponent, MobileRouteComponent, SenderidTemplateRouteComponent, SenderidMobileRouteComponent, CountryOperatorRouteComponent],
  imports: [
    CommonModule,
    NgbModule,
    AddRoutesRoutingModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule,  MatRadioModule
     ],
})
export class AddRoutesModule { }
