import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bl-mobile-senderid-route',
  templateUrl: './bl-mobile-senderid-route.component.html',
  styleUrls: ['./bl-mobile-senderid-route.component.css']
})
export class BlMobileSenderidRouteComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Global', 'Gateway','Account'];

  constructor() { }

    ngOnInit() {
      this.accountType = this.accounts[0];
    }
}