import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomRouteComponent } from './custom-route.component';
import { CrMenuComponent } from './cr-menu/cr-menu.component';
import { AddRoutesComponent } from './add-routes/add-routes.component';


const custRoutes: Routes = [
  {
    path: 'route-management/custom-route',
    component: CrMenuComponent
  },
  {
  path: 'route-management/custom-route',
  component: CustomRouteComponent,
  children: [
    // {
    //   path: 'add-route',
    //   component: AddRoutesComponent
    // },
]}
];

@NgModule({
  imports: [RouterModule.forChild(custRoutes)],
  exports: [RouterModule]
})
export class CustomRouteRoutingModule { }
