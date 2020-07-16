import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomRouteComponent } from './custom-route.component';
import { CrMenuComponent } from './cr-menu/cr-menu.component';
import { AddRoutesComponent } from './add-routes/add-routes.component';
import { AuthGuard } from '../../auth-management/guards/auth.guard';


const custRoutes: Routes = [
  {
    path: 'route-management/custom-route',
    component: CrMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(custRoutes)],
  exports: [RouterModule]
})
export class CustomRouteRoutingModule { }
