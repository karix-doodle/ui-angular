import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlabComponent } from './slab.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';



const routes: Routes = [
  {
    path: 'billplan-management/postpaid/slab',
    component: SlabComponent,

    children: [
      {
        path: 'create-ratecard',
        component: CreateRatecardComponent
      },
      {
        path: 'assigned-ratecard-view',
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
