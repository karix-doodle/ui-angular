import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { PrepaidRoutingModule } from './prepaid-routing.module';
import { PrepaidComponent } from './prepaid.component';
import { CountryOperatorModule } from './country-operator/country-operator.module';
import { CountryModule } from './country/country.module';
import { FlatFixedModule } from './flat-fixed/flat-fixed.module';
import { RatecardListComponent } from './ratecard-list/ratecard-list.component';


@NgModule({
  declarations: [PrepaidComponent, RatecardListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PrepaidRoutingModule,
    CountryModule,
    CountryOperatorModule,
    FlatFixedModule
  ]
})
export class PrepaidModule { }
