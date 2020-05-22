import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senderid-template-route',
  templateUrl: './senderid-template-route.component.html',
  styleUrls: ['./senderid-template-route.component.css']
})
export class SenderidTemplateRouteComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Global', 'Account'];

  constructor() { }

  ngOnInit() {
    this.accountType = this.accounts[0];
  }
}


