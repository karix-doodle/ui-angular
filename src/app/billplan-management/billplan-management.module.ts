import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BillplanManagementRoutingModule } from './billplan-management-routing.module';
import { BillplanManagementComponent } from './billplan-management.component';
import { BillplanHomeComponent } from './billplan-home/billplan-home.component';
import { BillplanListComponent } from './billplan-list/billplan-list.component';

import { PrepaidModule } from './prepaid/prepaid.module';
import { PostpaidModule } from './postpaid/postpaid.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BillplanManagementComponent, BillplanHomeComponent, BillplanListComponent],
  imports: [
    CommonModule,
    FormsModule,
    BillplanManagementRoutingModule,
    PrepaidModule,
    SharedModule,
    PostpaidModule
  ]
})
export class BillplanManagementModule { }
