import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomService } from './RouteManagement/custom-route/custom.service';
import { RouteManagementService } from './RouteManagement/route-management.service';
import { LcrService } from './LeastCostRouting/lcr.service';
import { GenericService } from './Generic/generic.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RouteManagementService,
    GenericService,
    LcrService,
    CustomService
  ]
})
export class ServicesModule { }
