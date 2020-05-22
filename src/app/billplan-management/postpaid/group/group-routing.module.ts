import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupComponent } from './group.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';

const routes: Routes = [
  {
    path: 'billplan-management/postpaid/group',
    component:  GroupComponent,
  
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
export class GroupRoutingModule { }
