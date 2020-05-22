import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senderid-mobile-route',
  templateUrl: './senderid-mobile-route.component.html',
  styleUrls: ['./senderid-mobile-route.component.css']
})
export class SenderidMobileRouteComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Global', 'Account'];

  constructor() { }

  ngOnInit() {
    this.accountType = this.accounts[0];
  }

}
