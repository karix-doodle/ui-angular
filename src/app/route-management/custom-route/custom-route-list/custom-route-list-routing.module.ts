import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomRouteListComponent } from './custom-route-list.component';
import { CrRmMobileComponent } from './cr-rm-mobile/cr-rm-mobile.component';
import { CrRmSenderidComponent } from './cr-rm-senderid/cr-rm-senderid.component';
import { CrRmMobileSenderidComponent } from './cr-rm-mobile-senderid/cr-rm-mobile-senderid.component';
import { AuthGuard } from '../../../auth-management/guards/auth.guard';


const crListroutes: Routes = [
  {
    path: 'route-management/custom-route',
    component: CustomRouteListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mobile',
        component: CrRmMobileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sender-id',
        component: CrRmSenderidComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'mobile-sender-id',
        component: CrRmMobileSenderidComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(crListroutes)],
  exports: [RouterModule]
})
export class CustomRouteListRoutingModule { }
