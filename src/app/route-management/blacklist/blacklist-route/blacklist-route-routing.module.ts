import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlacklistRouteComponent } from './blacklist-route.component';
import { BlMobileComponent } from './bl-mobile/bl-mobile.component';
import { BlSenderidComponent } from './bl-senderid/bl-senderid.component';
import { BlMobileSenderidComponent } from './bl-mobile-senderid/bl-mobile-senderid.component';



const blRoutes: Routes = [  {
  path: 'route-management/blacklist',
  component: BlacklistRouteComponent,
  children: [
    {
      path: 'mobile',
      component: BlMobileComponent
    },
    {
      path: 'sender-id',
      component: BlSenderidComponent
    },
    {
      path: 'mobile-sender-id',
      component: BlMobileSenderidComponent
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(blRoutes)],
  exports: [RouterModule]
})
export class BlacklistRouteRoutingModule { }
