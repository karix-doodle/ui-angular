import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { StandardBillplanComponent } from './standard-billplan/standard-billplan.component';
import { GlobalCountryOperatorListComponent } from './global-country-operator-list/global-country-operator-list.component';
import { AuthGuard } from '../auth-management/guards/auth.guard';


const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'default-rate-card',
        component: StandardBillplanComponent
      },
      {
        path: 'global-country-operator-list',
        component: GlobalCountryOperatorListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
