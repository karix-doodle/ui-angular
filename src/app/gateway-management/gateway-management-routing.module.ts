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


const GMroutes: Routes =   [ 
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
      path: 'edit-gateway',
      component: EditGatewayComponent
    },
    {
      path: 'update-gateway',
      component: UpdateGatewayComponent
    },
    {
      path: 'gateway-details',
      component: GatewayDetailsComponent
    },
    {
      path: 'country-list',
      component: GtCountrylistComponent
    },
    {
      path: 'country-list-view',
      component: GtCountryListViewLogComponent
    },
    {
      path: 'details-view-log',
      component: GtDetailsViewLogComponent
    },
    {
      path: 'file-audit-log',
      component: GtFileAuditLogComponent
    },
    {
      path: 'file-audit-log-view',
      component: GtFileAuditLogViewComponent
    },
    {
      path: 'sender-id-whitelist',
      component: GtSenderIdWhiteListComponent
    },
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(GMroutes)],
  exports: [RouterModule]
})
export class GatewayManagementRoutingModule { }
