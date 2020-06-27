import { NgModule } from '@angular/core';
import { GroupModule } from '../group/group.module';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CountryStepperFormComponent } from './country-stepper-form/country-stepper-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CountryComponent, CreateRatecardComponent, AssignedRatecardViewComponent, CountryStepperFormComponent],
  imports: [
    GroupModule,
    CountryRoutingModule,
    SharedModule
  ]
})
export class CountryModule { }
