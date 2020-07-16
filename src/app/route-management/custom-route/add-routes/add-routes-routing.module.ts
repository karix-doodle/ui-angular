import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRoutesComponent } from './add-routes.component';
import { MobileRouteComponent } from './mobile-route/mobile-route.component';
import { SenderidTemplateRouteComponent } from './senderid-template-route/senderid-template-route.component';
import { SenderidMobileRouteComponent } from './senderid-mobile-route/senderid-mobile-route.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';

const addRoutes: Routes = [
  {
    path: 'route-management/custom-route/add-route',
    component: MobileRouteComponent
  },
  {
  path: 'route-management/custom-route/add-route',
  component: AddRoutesComponent,
  children: [
    {
      path: 'mobile-route',
      component: MobileRouteComponent
    },
    {
      path: 'senderid-route',
      component: SenderidTemplateRouteComponent
    },
    {
      path: 'senderid-mobile-route',
      component: SenderidMobileRouteComponent
    },
]}
];

@NgModule({
  imports: [RouterModule.forChild(addRoutes)],
  exports: [RouterModule]
})
export class AddRoutesRoutingModule { }
