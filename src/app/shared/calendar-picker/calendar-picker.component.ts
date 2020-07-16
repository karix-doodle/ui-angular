import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Subscription, Observable } from 'rxjs';

import * as moment from "moment";

@Component({
  selector: "app-calendar-picker",
  templateUrl: "./calendar-picker.component.html",
  styleUrls: ["./calendar-picker.component.css"],
})
export class CalendarPickerComponent implements OnInit {
  @Input() params: any;

  private eventDateParams: Subscription;
  @Input() handleDateParams: Observable<[any]>;

  @Output() selectDate = new EventEmitter();
  public date: any;

  selected: any;
  autoApply: boolean = false;
  singleDatePicker: boolean = false;
  showCustomRangeLabel: boolean = true;
  linkedCalendars: boolean = true;

  alwaysShowCalendars: boolean;
  ranges: any = {
    "Last 10 Days": [
      moment().subtract(9, "days").utcOffset(environment.UTC),
      moment(),
    ],
    "Last 15 Days": [
      moment().subtract(14, "days").utcOffset(environment.UTC),
      moment(),
    ],
    "Last 30 Days": [
      moment().subtract(29, "days").utcOffset(environment.UTC),
      moment(),
    ],
  };

  minDate: any = null;
  maxDate: any = null;

  constructor() { }

  ngOnInit() {
    this.initiateDateSelection();
    if (this.handleDateParams != undefined) {
      this.eventDateParams = this.handleDateParams.subscribe(([value]) => {
        this.params = value;
        this.initiateDateSelection()
      });
    }
  }

  initiateDateSelection() {
    if (this.params["type"] && this.params["type"] == "dateOnly") {
      this.ranges = {};
      this.autoApply = true;
      this.singleDatePicker = true;
      this.showCustomRangeLabel = false;
      this.linkedCalendars = false;
      this.selected = {
        startDate: this.params.startdate,
        endDate: this.params.startdate,
      };
      this.minDate = this.params.startdate;
    } else {
      this.selected = {
        startDate: this.params.fromdate,
        endDate: this.params.todate,
      };
      this.maxDate = moment();
    }
  }

  ngOnDestroy() {
    if (this.handleDateParams != undefined) {
      this.eventDateParams.unsubscribe();
    }
  }

  change(e): void {
    if (this.params['type'] == undefined && this.params['type'] != 'dateOnly') {
      this.selectDate.emit(e)
    }
  }

  eventClicked(e): void {
    if (this.params["type"] && this.params["type"] == "dateOnly") {
      this.selectDate.emit(e);
    }
  }
}
