import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FlatFixedRoutingModule } from './flat-fixed-routing.module';
import { FlatFixedComponent } from './flat-fixed.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';


@NgModule({
  declarations: [FlatFixedComponent, CreateRatecardComponent, AssignedRatecardViewComponent],
  imports: [
    CommonModule,
    NgbModule,
    FlatFixedRoutingModule
  ]
})
export class FlatFixedModule { }
