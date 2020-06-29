import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomService } from './RouteManagement/custom-route/custom.service';
import { RouteManagementService } from './RouteManagement/route-management.service';
import { LcrService } from './RouteManagement/LeastCostRouting/lcr.service';
import { GenericService } from './RouteManagement/Generic/generic.service';
import { PoolRouteService } from './RouteManagement/poolRoute/pool-route.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RouteManagementService,
    GenericService,
    LcrService,
    PoolRouteService,
    CustomService
  ]
})
export class ServicesModule { }
