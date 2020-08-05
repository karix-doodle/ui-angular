import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryComponent } from './country.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';
import { RoleGuard } from 'src/app/auth-management/guards/role.guard';
import { BillMangementCountryRole } from '../../roles';


const countryRoutes: Routes = [
  {
    path: 'billplan-management/postpaid/country',
    component: CountryComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    children: [
      {
        path: 'create-ratecard/:name/:cId/:bId',
        component: CreateRatecardComponent,
        data: {
          expectedRole: BillMangementCountryRole
        } ,
      },
      {
        path: 'assigned-ratecard-view/:id/:type',
        component: AssignedRatecardViewComponent,
        data: {
          expectedRole: BillMangementCountryRole
        } ,
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(countryRoutes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
