import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-route',
  templateUrl: './mobile-route.component.html',
  styleUrls: ['./mobile-route.component.css']
})
export class MobileRouteComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Global', 'Account'];

  constructor() { }

    ngOnInit() {
      this.accountType = this.accounts[0];
    }
}

