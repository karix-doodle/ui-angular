import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratecard-list',
  templateUrl: './ratecard-list.component.html',
  styleUrls: ['./ratecard-list.component.css']
})
export class RatecardListComponent implements OnInit {
  'rateCardType'="country";
  constructor() { }

  ngOnInit() {
  }

}
