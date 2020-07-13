import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmListComponent } from './cm-list.component';
import { CmListTableComponent } from './cm-list-table/cm-list-table.component';
import { PendingActivateTableComponent } from './pending-activate-table/pending-activate-table.component';
import { AuthGuard } from '../../auth-management/guards/auth.guard';

const cmTabroutes: Routes = [

  {
    path: 'customer-management',
    component: CmListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CmListTableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pending-activation',
        component: PendingActivateTableComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cmTabroutes)],
  exports: [RouterModule]
})
export class CmListRoutingModule { }