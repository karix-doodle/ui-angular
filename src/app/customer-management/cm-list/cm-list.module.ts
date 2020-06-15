import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CmListRoutingModule } from './cm-list-routing.module';
import { CmListTableComponent } from './cm-list-table/cm-list-table.component';
import { PendingActivateTableComponent } from './pending-activate-table/pending-activate-table.component';


@NgModule({
  declarations: [ CmListTableComponent, PendingActivateTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CmListRoutingModule
  ]
})
export class CmListModule { }
