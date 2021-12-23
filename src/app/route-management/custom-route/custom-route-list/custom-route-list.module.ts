import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { CustomRouteListRoutingModule } from './custom-route-list-routing.module';
import { CustomRouteListComponent } from './custom-route-list.component';
import { CrRmMobileComponent } from './cr-rm-mobile/cr-rm-mobile.component';
import { CrRmSenderidComponent } from './cr-rm-senderid/cr-rm-senderid.component';
import { CrRmMobileSenderidComponent } from './cr-rm-mobile-senderid/cr-rm-mobile-senderid.component';
import { CrRmCountryComponent } from './cr-rm-country/cr-rm-country.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomRouteListComponent, CrRmMobileComponent, CrRmSenderidComponent, CrRmMobileSenderidComponent, CrRmCountryComponent],
  imports: [
    CommonModule,
    CustomRouteListRoutingModule,
    MatTabsModule,
    SharedModule,
    FormsModule
  ]
})
export class CustomRouteListModule { }
