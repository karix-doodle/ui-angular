import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomService } from './custom.service';
import { RouteManagementService } from './RouteManagement/route-management.service';
import { LcrService } from './LeastCostRouting/lcr.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RouteManagementService,
    LcrService,
    CustomService
  ]
})
export class ServicesModule { }
