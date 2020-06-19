import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillManagementService } from './BillManagement/billplan-management.service';
import { GroupRouteService } from './BillManagement/Group/group-route.service';
import { CreateAssignRateCardService } from './BillManagement/CreateAssignRateCard/create-assign-rate-card.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BillManagementService,
    GroupRouteService,
    CreateAssignRateCardService
  ]
})

export class ServicesModule { }
