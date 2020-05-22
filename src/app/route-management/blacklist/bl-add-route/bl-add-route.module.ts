import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BlAddRouteRoutingModule } from './bl-add-route-routing.module';
import { BlAddRouteComponent } from './bl-add-route.component';
import { BlMobileRouteComponent } from './bl-mobile-route/bl-mobile-route.component';
import { BlMobileSenderidRouteComponent } from './bl-mobile-senderid-route/bl-mobile-senderid-route.component';
import { BlSenderidRouteComponent } from './bl-senderid-route/bl-senderid-route.component';


@NgModule({
  declarations: [BlAddRouteComponent, BlMobileRouteComponent, BlMobileSenderidRouteComponent, BlSenderidRouteComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    NgbModule,
    BlAddRouteRoutingModule
  ]
})
export class BlAddRouteModule { }
