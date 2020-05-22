import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatecardListComponent } from './ratecard-list/ratecard-list.component';


const routes: Routes = [
  {
    path: 'billplan-management-prepaid',
    component: RatecardListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepaidRoutingModule { }
