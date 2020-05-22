import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoolRouteComponent } from './pool-route.component';
import { CreatePoolComponent } from './create-pool/create-pool.component';
import { PoolRouteListComponent } from './pool-route-list/pool-route-list.component';
import { PrActWiseViewComponent } from './pr-act-wise-view/pr-act-wise-view.component';


const poolRoutes: Routes = [
  {
    path: 'route-management/pool-route',
    component: PoolRouteListComponent
  },
  {
  path: 'route-management/pool-route',
  component: PoolRouteComponent,
  children: [
    {
      path: 'create-pool',
      component: CreatePoolComponent
    },
    {
      path: 'account-wise-view',
      component: PrActWiseViewComponent
    },
]}
];
@NgModule({
  imports: [RouterModule.forChild(poolRoutes)],
  exports: [RouterModule]
})
export class PoolRouteRoutingModule { }
