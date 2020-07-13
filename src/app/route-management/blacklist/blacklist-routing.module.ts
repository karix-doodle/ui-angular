import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlacklistMenuComponent } from './blacklist-menu/blacklist-menu.component';
import { AuthGuard } from '../../auth-management/guards/auth.guard';


const blackListroutes: Routes = [
  {
    path: 'route-management/blacklist',
    component: BlacklistMenuComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(blackListroutes)],
  exports: [RouterModule]
})
export class BlacklistRoutingModule { }
