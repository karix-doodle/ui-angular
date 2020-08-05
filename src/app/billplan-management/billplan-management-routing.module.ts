import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillplanManagementComponent } from './billplan-management.component';
import { BillplanHomeComponent } from './billplan-home/billplan-home.component';
import { BillplanListComponent } from './billplan-list/billplan-list.component';
import { AuthGuard } from '../auth-management/guards/auth.guard';
import { RoleGuard } from '../auth-management/guards/role.guard';
import {BillMangementRole, BillMangementChilderenRole} from './roles'


const BProutes: Routes = [
  {
    path: 'billplan-management',
    component: BillplanHomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: BillMangementRole
    } ,
  },
  {
    path: 'billplan-management',
    component: BillplanManagementComponent,
    canActivateChild: [AuthGuard, RoleGuard],

    children: [
      {
        path: 'home',
        component: BillplanListComponent,
        data: {
          expectedRole: BillMangementChilderenRole
        } ,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(BProutes)],
  exports: [RouterModule]
})
export class BillplanManagementRoutingModule { }
