import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { BillplanManagementComponent } from './billplan-management.component';
import { BillplanHomeComponent } from './billplan-home/billplan-home.component';
import { BillplanListComponent } from './billplan-list/billplan-list.component';
import { AuthGuard } from '../auth-management/guards/auth.guard';



const BProutes: Routes = [
  {
    path: 'billplan-management',
    component: BillplanHomeComponent
  },
  {
    path: 'billplan-management',
    component: BillplanManagementComponent,
    children: [
      {
        path: 'home',
        component: BillplanListComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(BProutes)],
  exports: [RouterModule]
})
export class BillplanManagementRoutingModule { }
