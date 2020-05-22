import { Component, OnInit } from '@angular/core';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {

  format: 'dd:MM:yyyy hh:mm a';
  constructor(){}

  ngOnInit() {
  }

}
