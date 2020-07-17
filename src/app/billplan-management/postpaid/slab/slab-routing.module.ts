import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlabComponent } from './slab.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';



const routes: Routes = [
  {
    path: 'billplan-management/postpaid/slab',
    component: SlabComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-ratecard/:name/:cId/:bId',
        component: CreateRatecardComponent
      },
      {
        path:'assigned-ratecard-view/:id/:type',
        component: AssignedRatecardViewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlabRoutingModule { }
