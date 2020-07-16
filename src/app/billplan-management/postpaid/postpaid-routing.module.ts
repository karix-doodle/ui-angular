import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatecardListComponent } from './ratecard-list/ratecard-list.component';
import { AuthGuard } from '../../auth-management/guards/auth.guard';


const postpaidRoutes: Routes = [
  {
    path: 'billplan-management/postpaid/:id',
    component: RatecardListComponent
  },
  {
    path: 'billplan-management/postpaid/:id/:name',
    component: RatecardListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(postpaidRoutes)],
  exports: [RouterModule]
})
export class PostpaidRoutingModule { }
