import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { GatewayManagementRoutingModule } from './gateway-management-routing.module';
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

@NgModule({
  declarations: [GatewayManagementComponent, 
    CreateGatewayComponent, GtListingComponent, EditGatewayComponent, 
    GatewayDetailsComponent, GtCountrylistComponent, UpdateGatewayComponent, 
    GtDetailsViewLogComponent, GtFileAuditLogComponent, GtFileAuditLogViewComponent, 
    GtCountryListViewLogComponent, GtSenderIdWhiteListComponent],
  imports: [
    CommonModule,
    NgbModule,
    GatewayManagementRoutingModule,
    SharedModule
  ],
})
export class GatewayManagementModule { }
