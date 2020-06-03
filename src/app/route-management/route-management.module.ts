import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { RouteManagementRoutingModule } from './route-management-routing.module';
import { RouteManagementComponent } from './route-management.component';
import { RmMenuPageComponent } from './rm-menu-page/rm-menu-page.component';
import { RmLcrComponent } from './rm-lcr/rm-lcr.component';
import { PoolRouteModule } from './pool-route/pool-route.module';
import { CustomRouteModule } from './custom-route/custom-route.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { ServicesModule } from './services/services.module';


@NgModule({
  declarations: [RouteManagementComponent, RmMenuPageComponent, RmLcrComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouteManagementRoutingModule,
    PoolRouteModule,
    CustomRouteModule,
    BlacklistModule,
    ServicesModule
  ]

})
export class RouteManagementModule { }
