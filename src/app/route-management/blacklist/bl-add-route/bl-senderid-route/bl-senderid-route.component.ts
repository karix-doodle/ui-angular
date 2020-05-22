import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bl-senderid-route',
  templateUrl: './bl-senderid-route.component.html',
  styleUrls: ['./bl-senderid-route.component.css']
})
export class BlSenderidRouteComponent implements OnInit {
  accountType: string;
  accounts: string[] = ['Global', 'Gateway','Account'];

  constructor() { }

    ngOnInit() {
      this.accountType = this.accounts[0];

    }
}
