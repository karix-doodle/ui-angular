import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';

import { CmListModule } from './cm-list/cm-list.module';
import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { CustomerManagementComponent } from './customer-management.component';
import { CmListComponent } from './cm-list/cm-list.component';
import { CmViewComponent } from './cm-view/cm-view.component';
import { CmEditComponent } from './cm-edit/cm-edit.component';
import { CmViewLogComponent } from './cm-view-log/cm-view-log.component';
import { CmAuditLogComponent } from './cm-audit-log/cm-audit-log.component';
import { CmShowMarginComponent } from './cm-show-margin/cm-show-margin.component';
import { CountryOperatorListComponent } from './country-operator-list/country-operator-list.component';

@NgModule({
  declarations: [CustomerManagementComponent, CmListComponent, CmViewComponent, CmEditComponent, CmViewLogComponent, CmAuditLogComponent, CmShowMarginComponent, CountryOperatorListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    MatTabsModule,
    CustomerManagementRoutingModule,
    CmListModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerManagementModule { }
