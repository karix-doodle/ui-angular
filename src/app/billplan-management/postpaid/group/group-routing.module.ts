import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupComponent } from './group.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';

const routes: Routes = [
  {
    path: 'billplan-management/postpaid/group',
    component: GroupComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-ratecard',
        component: CreateRatecardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'assigned-ratecard-view',
        component: AssignedRatecardViewComponent,
        canActivate: [AuthGuard]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
