import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomService } from './custom.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    CustomService
  ]
})
export class ServicesModule { }
