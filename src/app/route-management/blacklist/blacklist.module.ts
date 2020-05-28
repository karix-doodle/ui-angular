import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlacklistRoutingModule } from './blacklist-routing.module';
import { BlacklistRouteModule } from './blacklist-route/blacklist-route.module';
import { BlAddRouteModule } from './bl-add-route/bl-add-route.module';
import { BlacklistComponent } from './blacklist.component';
import { BlacklistMenuComponent } from './blacklist-menu/blacklist-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BlacklistComponent, BlacklistMenuComponent],
  imports: [
    CommonModule,
    BlacklistRoutingModule,
    BlacklistRouteModule,
    BlAddRouteModule,
    SharedModule
  ]
})
export class BlacklistModule { }
