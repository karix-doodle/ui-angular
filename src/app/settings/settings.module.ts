import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { StandardBillplanComponent } from './standard-billplan/standard-billplan.component';
import { GlobalCountryOperatorListComponent } from './global-country-operator-list/global-country-operator-list.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';


@NgModule({
  declarations: [SettingsComponent, StandardBillplanComponent, GlobalCountryOperatorListComponent, SettingsHomeComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    SettingsRoutingModule,
    SharedModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule { }
