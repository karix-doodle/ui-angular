import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { BlacklistRouteRoutingModule } from './blacklist-route-routing.module';
import { BlacklistRouteComponent } from './blacklist-route.component';
import { BlMobileComponent } from './bl-mobile/bl-mobile.component';
import { BlSenderidComponent } from './bl-senderid/bl-senderid.component';
import { BlMobileSenderidComponent } from './bl-mobile-senderid/bl-mobile-senderid.component';


@NgModule({
  declarations: [BlacklistRouteComponent, BlMobileComponent, BlSenderidComponent, BlMobileSenderidComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    BlacklistRouteRoutingModule
  ]
})
export class BlacklistRouteModule { }
