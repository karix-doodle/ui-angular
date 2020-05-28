import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserModule } from '@angular/platform-browser';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { CalendarPickerComponent } from './calendar-picker/calendar-picker.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [SharedComponent, CalendarPickerComponent, DateTimePickerComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    SharedRoutingModule,
    DateTimePickerModule,
    NgxDaterangepickerMd.forRoot({
      separator: ' - ',
      applyLabel: 'Apply',
    }),
  ],
  exports: [CalendarPickerComponent, DateTimePickerComponent, FilterPipe]
})
export class SharedModule { }
