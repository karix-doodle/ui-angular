import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material';

import { CustomRouteRoutingModule } from './custom-route-routing.module';
import { CustomRouteListModule } from './custom-route-list/custom-route-list.module';
import { AddRoutesModule } from './add-routes/add-routes.module';
import { CustomRouteComponent } from './custom-route.component';
import { CrMenuComponent } from './cr-menu/cr-menu.component';

@NgModule({
  declarations: [CustomRouteComponent, CrMenuComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatTabsModule,
    CustomRouteRoutingModule,
    CustomRouteListModule,
    AddRoutesModule
  ]
})
export class CustomRouteModule { }
