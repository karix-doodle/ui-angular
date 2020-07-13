import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmViewComponent } from './cm-view/cm-view.component';
import { CmEditComponent } from './cm-edit/cm-edit.component';
import { CmViewLogComponent } from './cm-view-log/cm-view-log.component';
import { CmAuditLogComponent } from './cm-audit-log/cm-audit-log.component';
import { CmShowMarginComponent } from './cm-show-margin/cm-show-margin.component';
import { CountryOperatorListComponent } from './country-operator-list/country-operator-list.component';
import { AuthGuard } from '../auth-management/guards/auth.guard';

const CMroutes: Routes = [
    {
      path: 'customer-management/customer-management-view',
      component: CmViewComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer-management/customer-management-edit/:esmeaddr',
      component: CmEditComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer-management/customer-management-view-log',
      component: CmViewLogComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer-management/customer-management-audit-log',
      component: CmAuditLogComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer-management/customer-management-show-margin-list',
      component: CmShowMarginComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'customer-management/allowed-country-operator-list',
      component: CountryOperatorListComponent,
      canActivate: [AuthGuard]
    }

];

@NgModule({
  imports: [RouterModule.forChild(CMroutes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
