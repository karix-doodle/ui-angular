import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillManagementService } from './BillManagement/billplan-management.service';
import { GroupRouteService } from './BillManagement/Group/group-route.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BillManagementService,
    GroupRouteService
  ]
})

export class ServicesModule { }
