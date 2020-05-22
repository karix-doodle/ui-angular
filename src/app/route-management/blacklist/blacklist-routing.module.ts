import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlacklistMenuComponent } from './blacklist-menu/blacklist-menu.component';


const blackListroutes: Routes = [
  {
    path: 'route-management/blacklist',
    component: BlacklistMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(blackListroutes)],
  exports: [RouterModule]
})
export class BlacklistRoutingModule { }
