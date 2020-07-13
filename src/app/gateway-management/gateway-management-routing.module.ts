import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GatewayManagementComponent } from './gateway-management.component';
import { CreateGatewayComponent } from './create-gateway/create-gateway.component';
import { GtListingComponent } from './gt-listing/gt-listing.component';
import { EditGatewayComponent } from './edit-gateway/edit-gateway.component';
import { GatewayDetailsComponent } from './gateway-details/gateway-details.component';
import { GtCountrylistComponent } from './gt-countrylist/gt-countrylist.component';
import { UpdateGatewayComponent } from './update-gateway/update-gateway.component';
import { GtDetailsViewLogComponent } from './gt-details-view-log/gt-details-view-log.component';
import { GtFileAuditLogComponent } from './gt-file-audit-log/gt-file-audit-log.component';
import { GtFileAuditLogViewComponent } from './gt-file-audit-log-view/gt-file-audit-log-view.component';
import { GtCountryListViewLogComponent } from './gt-country-list-view-log/gt-country-list-view-log.component';
import { GtSenderIdWhiteListComponent } from './gt-sender-id-white-list/gt-sender-id-white-list.component';
import { GtSenderidContentComponent } from './gt-senderid-content/gt-senderid-content.component';
import { GtESMEAddrRoutedComponent } from './gt-esmeaddr-route/gt-esmeaddr-route.component';
import { AuthGuard } from '../auth-management/guards/auth.guard';


const GMroutes: Routes = [
  {
    path: 'gateway-management',
    component: GtListingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gateway-management',
    component: GatewayManagementComponent,
    children: [
      {
        path: 'gateway-list',
        component: GtListingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-gateway',
        component: CreateGatewayComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-gateway/:id',
        component: EditGatewayComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update-gateway/:id/:name/:currencyId',
        component: UpdateGatewayComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'gateway-details/:id',
        component: GatewayDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'country-list/:id/:name',
        component: GtCountrylistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'country-list-view/:id/:name/:country/:operator',
        component: GtCountryListViewLogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'details-view-log/:id/:name',
        component: GtDetailsViewLogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'file-audit-log/:id/:name',
        component: GtFileAuditLogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'file-audit-log-view/:id/:name/:uuid',
        component: GtFileAuditLogViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sender-id-whitelist/:id/:name',
        component: GtSenderIdWhiteListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'esme-addr-routed/:id/:name',
        component: GtESMEAddrRoutedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'senderid-content-block/:id/:name',
        component: GtSenderidContentComponent,
        canActivate: [AuthGuard]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(GMroutes)],
  exports: [RouterModule]
})
export class GatewayManagementRoutingModule { }
