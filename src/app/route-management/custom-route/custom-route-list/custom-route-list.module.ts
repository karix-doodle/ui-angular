import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { CustomRouteListRoutingModule } from './custom-route-list-routing.module';
import { CustomRouteListComponent } from './custom-route-list.component';
import { CrRmMobileComponent } from './cr-rm-mobile/cr-rm-mobile.component';
import { CrRmSenderidComponent } from './cr-rm-senderid/cr-rm-senderid.component';
import { CrRmMobileSenderidComponent } from './cr-rm-mobile-senderid/cr-rm-mobile-senderid.component';


@NgModule({
  declarations: [CustomRouteListComponent, CrRmMobileComponent, CrRmSenderidComponent, CrRmMobileSenderidComponent],
  imports: [
    CommonModule,
    CustomRouteListRoutingModule,
    MatTabsModule
  ]
})
export class CustomRouteListModule { }
