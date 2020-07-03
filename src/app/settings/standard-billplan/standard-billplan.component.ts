import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-billplan',
  templateUrl: './standard-billplan.component.html',
  styleUrls: ['./standard-billplan.component.css']
})
export class StandardBillplanComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Country & Operator', 'Country'];

  constructor() { }

  ngOnInit() {
    this.accountType = this.accounts[0];
  }
  changeComboo(event) {

  }
}
