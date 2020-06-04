import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.css']
})
export class CalendarPickerComponent implements OnInit {
  @Input() params: any;
  @Output() selectDate = new EventEmitter();
  public date: any;

  selected: any;

  alwaysShowCalendars: boolean;
  ranges: any = {
    'Last 10 Days': [moment().subtract(9, 'days'), moment()],
    'Last 15 Days': [moment().subtract(14, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()]
  }

  constructor() {
  }

  ngOnInit() {
    this.selected = {
      startDate: this.params.fromdate,
      endDate: this.params.todate
    }
  }

  change(e): void {
    this.selectDate.emit(e)
  }

}
