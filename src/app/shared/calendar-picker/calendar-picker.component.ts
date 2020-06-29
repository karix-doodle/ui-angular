import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

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
  autoApply: boolean = false
  singleDatePicker: boolean = false
  showCustomRangeLabel: boolean = true
  linkedCalendars: boolean = true

  alwaysShowCalendars: boolean;
  ranges: any = {
    'Last 10 Days': [moment().subtract(9, 'days').utcOffset(environment.UTC), moment()],
    'Last 15 Days': [moment().subtract(14, 'days').utcOffset(environment.UTC), moment()],
    'Last 30 Days': [moment().subtract(29, 'days').utcOffset(environment.UTC), moment()]
  }

  minDate: any = null

  constructor() {
  }

  ngOnInit() {
    if (this.params['type'] && this.params['type'] == 'dateOnly') {
      this.ranges = {}
      this.autoApply = true
      this.singleDatePicker = true
      this.showCustomRangeLabel = false
      this.linkedCalendars = false
      this.selected = {
        startDate: this.params.startdate.add(1, 'days'),
      }
      this.minDate = this.params.startdate
    } else {
      this.selected = {
        startDate: this.params.fromdate,
        endDate: this.params.todate
      }
    }

  }

  change(e): void {
    if (this.params['type'] == undefined && this.params['type'] != 'dateOnly') {
      this.selectDate.emit(e)
    }
  }

  eventClicked(e): void {
    if (this.params['type'] && this.params['type'] == 'dateOnly') {
      this.selectDate.emit(e)
    }
  }

}
