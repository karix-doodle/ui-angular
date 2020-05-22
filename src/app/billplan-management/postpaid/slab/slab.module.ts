import { NgModule } from '@angular/core';

import { GroupModule } from '../group/group.module';

import { SlabRoutingModule } from './slab-routing.module';
import { SlabComponent } from './slab.component';
import { AssignedRatecardViewComponent } from './assigned-ratecard-view/assigned-ratecard-view.component';
import { CreateRatecardComponent } from './create-ratecard/create-ratecard.component';
import { SlabStepperFormComponent } from './slab-stepper-form/slab-stepper-form.component';


@NgModule({
  declarations: [SlabComponent, AssignedRatecardViewComponent, CreateRatecardComponent, SlabStepperFormComponent],
  imports: [
    GroupModule,
    SlabRoutingModule
  ]
})
export class SlabModule { }
