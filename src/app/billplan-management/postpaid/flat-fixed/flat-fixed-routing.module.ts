import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatFixedComponent } from './flat-fixed.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';

const routes: Routes = [
  {
    path: 'billplan-management/postpaid/flat-fixed',
    component: FlatFixedComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlatFixedRoutingModule { }
