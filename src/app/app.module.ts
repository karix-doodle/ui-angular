import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { GatewayManagementModule } from './gateway-management/gateway-management.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';
import { RouteManagementModule } from './route-management/route-management.module';
import { CustomerManagementModule } from './customer-management/customer-management.module';
import { BillplanManagementModule } from './billplan-management/billplan-management.module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot({
      separator: ' - ',
      applyLabel: 'Apply',
    }),
    SharedModule,
    GatewayManagementModule,
    RouteManagementModule,
    CustomerManagementModule,
    BillplanManagementModule,
    SettingsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
