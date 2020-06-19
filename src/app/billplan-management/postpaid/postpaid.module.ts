import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { PostpaidRoutingModule } from './postpaid-routing.module';
import { PostpaidComponent } from './postpaid.component';
import { RatecardListComponent } from './ratecard-list/ratecard-list.component';

import { CountryModule } from './country/country.module';
import { CountryOperatorModule } from './country-operator/country-operator.module';
import { FlatFixedModule } from './flat-fixed/flat-fixed.module';
import { GroupModule } from './group/group.module';
import { SlabModule } from './slab/slab.module';

@NgModule({
  declarations: [PostpaidComponent, RatecardListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PostpaidRoutingModule,
    CountryModule,
    CountryOperatorModule,
    FlatFixedModule,
    GroupModule,
    SlabModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PostpaidModule { }
