import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryComponent } from './country.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';


const countryRoutes: Routes = [
  {
  path: 'billplan-management/prepaid/country',
  component: CountryComponent,
  children: [
    {
      path: 'create-ratecard',
      component: CreateRatecardComponent
    },
    {
      path: 'assigned-ratecard-view',
      component: AssignedRatecardViewComponent
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(countryRoutes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
