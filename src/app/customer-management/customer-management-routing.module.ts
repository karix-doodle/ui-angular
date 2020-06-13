import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmViewComponent } from './cm-view/cm-view.component';
import { CmEditComponent } from './cm-edit/cm-edit.component';
import { CmViewLogComponent } from './cm-view-log/cm-view-log.component';
import { CmAuditLogComponent } from './cm-audit-log/cm-audit-log.component';
import { CmShowMarginComponent } from './cm-show-margin/cm-show-margin.component';
import { CountryOperatorListComponent } from './country-operator-list/country-operator-list.component';

const CMroutes: Routes = [
    {
      path: 'customer-management/customer-management-view',
      component: CmViewComponent
    },
    {
      path: 'customer-management/customer-management-edit/:esmeaddr',
      component: CmEditComponent
    },
    {
      path: 'customer-management/customer-management-view-log',
      component: CmViewLogComponent
    },
    {
      path: 'customer-management/customer-management-audit-log',
      component: CmAuditLogComponent
    },
    {
      path: 'customer-management/customer-management-show-margin-list',
      component: CmShowMarginComponent
    },
    {
      path: 'customer-management/allowed-country-operator-list',
      component: CountryOperatorListComponent
    },

];

@NgModule({
  imports: [RouterModule.forChild(CMroutes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
