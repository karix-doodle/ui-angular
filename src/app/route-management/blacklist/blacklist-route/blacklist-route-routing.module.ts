import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlacklistRouteComponent } from './blacklist-route.component';
import { BlMobileComponent } from './bl-mobile/bl-mobile.component';
import { BlSenderidComponent } from './bl-senderid/bl-senderid.component';
import { BlMobileSenderidComponent } from './bl-mobile-senderid/bl-mobile-senderid.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';



const blRoutes: Routes = [  {
  path: 'route-management/blacklist',
  component: BlacklistRouteComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'mobile',
      component: BlMobileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'sender-id',
      component: BlSenderidComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'mobile-sender-id',
      component: BlMobileSenderidComponent,
      canActivate: [AuthGuard]
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(blRoutes)],
  exports: [RouterModule]
})
export class BlacklistRouteRoutingModule { }
