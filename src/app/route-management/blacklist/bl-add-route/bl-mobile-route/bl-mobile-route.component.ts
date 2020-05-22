import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bl-mobile-route',
  templateUrl: './bl-mobile-route.component.html',
  styleUrls: ['./bl-mobile-route.component.css']
})
export class BlMobileRouteComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Global', 'Gateway','Account'];

  constructor() { }

    ngOnInit() {
      this.accountType = this.accounts[0];

    }
}
