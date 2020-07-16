import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteManagementComponent } from './route-management.component';
import { RmMenuPageComponent } from './rm-menu-page/rm-menu-page.component';
import { RmLcrComponent } from './rm-lcr/rm-lcr.component';
import { AuthGuard } from '../auth-management/guards/auth.guard';

const RMroutes: Routes = [
  {
    path: 'route-management',
    component: RmMenuPageComponent
  },
  {
    path: 'route-management',
    component: RouteManagementComponent,
    children: [
      {
        path: 'dashboard',
        component: RmMenuPageComponent
      },
      {
        path: 'least-cost-route',
        component: RmLcrComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(RMroutes)],
  exports: [RouterModule]
})
export class RouteManagementRoutingModule { }
