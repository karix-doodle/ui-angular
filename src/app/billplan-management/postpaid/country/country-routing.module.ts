import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryComponent } from './country.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';


const countryRoutes: Routes = [
  {
    path: 'billplan-management/postpaid/country',
    component: CountryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-ratecard',
        component: CreateRatecardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'assigned-ratecard-view',
        component: AssignedRatecardViewComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(countryRoutes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
