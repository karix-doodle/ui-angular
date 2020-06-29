import { NgModule } from '@angular/core';
import { GroupModule } from '../group/group.module';

import { CountryOperatorRoutingModule } from './country-operator-routing.module';
import { CountryOperatorComponent } from './country-operator.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { CountryOperatorStepperFormComponent } from './country-operator-stepper-form/country-operator-stepper-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CountryOperatorComponent, AssignedRatecardViewComponent, CreateRatecardComponent, CountryOperatorStepperFormComponent],
  imports: [
    GroupModule,
    CountryOperatorRoutingModule,
    SharedModule
  ]
})
export class CountryOperatorModule { }
