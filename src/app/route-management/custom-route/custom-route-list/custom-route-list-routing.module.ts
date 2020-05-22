import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomRouteListComponent } from './custom-route-list.component';
import { CrRmMobileComponent } from './cr-rm-mobile/cr-rm-mobile.component';
import { CrRmSenderidComponent } from './cr-rm-senderid/cr-rm-senderid.component';
import { CrRmMobileSenderidComponent } from './cr-rm-mobile-senderid/cr-rm-mobile-senderid.component';


const crListroutes: Routes = [
  {
    path: 'route-management/custom-route',
    component: CustomRouteListComponent,
    children: [
      {
        path: 'mobile',
        component: CrRmMobileComponent
      },
      {
        path: 'sender-id',
        component: CrRmSenderidComponent
      },
      {
        path: 'mobile-sender-id',
        component: CrRmMobileSenderidComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(crListroutes)],
  exports: [RouterModule]
})
export class CustomRouteListRoutingModule { }
