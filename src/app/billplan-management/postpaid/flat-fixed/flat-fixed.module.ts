import { NgModule } from '@angular/core';

import { GroupModule } from '../group/group.module';

import { FlatFixedRoutingModule } from './flat-fixed-routing.module';
import { FlatFixedComponent } from './flat-fixed.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';


@NgModule({
  declarations: [FlatFixedComponent, AssignedRatecardViewComponent, CreateRatecardComponent],
  imports: [
    GroupModule,
    FlatFixedRoutingModule
  ]
})
export class FlatFixedModule { }
