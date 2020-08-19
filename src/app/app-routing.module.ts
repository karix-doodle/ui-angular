import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../app/auth-management/guards/auth.guard';
import { AuthManagementComponent } from './auth-management/auth-management.component';

const routes: Routes = [
  { path: '', component: AuthManagementComponent },
  { path: 'authmgmt', component: AuthManagementComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
