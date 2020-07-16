import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlAddRouteComponent } from './bl-add-route.component';
import { BlMobileRouteComponent } from './bl-mobile-route/bl-mobile-route.component';
import { BlMobileSenderidRouteComponent } from './bl-mobile-senderid-route/bl-mobile-senderid-route.component';
import { BlSenderidRouteComponent } from './bl-senderid-route/bl-senderid-route.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';



const blRoutes: Routes = [
  {
    path: 'route-management/blacklist/add-route',
    component: BlMobileRouteComponent
  },
  {
  path: 'route-management/blacklist/add-route',
  component: BlAddRouteComponent,
  children: [
    {
      path: 'mobile-route',
      component: BlMobileRouteComponent
    },
    {
      path: 'senderid-route',
      component: BlSenderidRouteComponent
    },
    {
      path: 'senderid-mobile-route',
      component: BlMobileSenderidRouteComponent
    },
]}
];

@NgModule({
  imports: [RouterModule.forChild(blRoutes)],
  exports: [RouterModule]
})
export class BlAddRouteRoutingModule { }
