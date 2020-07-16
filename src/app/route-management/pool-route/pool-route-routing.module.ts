import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoolRouteComponent } from './pool-route.component';
import { CreatePoolComponent } from './create-pool/create-pool.component';
import { PoolRouteListComponent } from './pool-route-list/pool-route-list.component';
import { PrActWiseViewComponent } from './pr-act-wise-view/pr-act-wise-view.component';
import { AuthGuard } from '../../auth-management/guards/auth.guard';


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
        path: 'clone-pool/:id',
        component: CreatePoolComponent
      },
      {
        path: 'account-wise-view/:id',
        component: PrActWiseViewComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(poolRoutes)],
  exports: [RouterModule]
})
export class PoolRouteRoutingModule { }
