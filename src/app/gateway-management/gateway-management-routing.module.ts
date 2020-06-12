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


const GMroutes: Routes = [
  {
    path: 'gateway-management',
    component: GtListingComponent
  },
  {
    path: 'gateway-management',
    component: GatewayManagementComponent,
    children: [
      {
        path: 'gateway-list',
        component: GtListingComponent
      },
      {
        path: 'create-gateway',
        component: CreateGatewayComponent
      },
      {
        path: 'edit-gateway/:id',
        component: EditGatewayComponent
      },
      {
        path: 'update-gateway/:id/:name',
        component: UpdateGatewayComponent
      },
      {
        path: 'gateway-details/:id',
        component: GatewayDetailsComponent
      },
      {
        path: 'country-list/:id/:name',
        component: GtCountrylistComponent
      },
      {
        path: 'country-list-view/:id/:name/:country/:operator',
        component: GtCountryListViewLogComponent
      },
      {
        path: 'details-view-log/:id/:name',
        component: GtDetailsViewLogComponent
      },
      {
        path: 'file-audit-log/:id/:name',
        component: GtFileAuditLogComponent
      },
      {
        path: 'file-audit-log-view/:id/:name/:uuid',
        component: GtFileAuditLogViewComponent
      },
      {
        path: 'sender-id-whitelist/:id/:name',
        component: GtSenderIdWhiteListComponent
      },
      {
        path: 'esme-addr-routed/:id/:name',
        component: GtESMEAddrRoutedComponent
      },
      {
        path: 'senderid-content-block/:id/:name',
        component: GtSenderidContentComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(GMroutes)],
  exports: [RouterModule]
})
export class GatewayManagementRoutingModule { }
