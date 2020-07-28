import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../service/auth/authorization.service';
import { CustomerMgmt } from '../../model/authorization.model';

@Component({
  selector: 'app-cm-list',
  templateUrl: './cm-list.component.html',
  styleUrls: ['./cm-list.component.css']
})
export class CmListComponent implements OnInit {

  navLinks: any[];
  // activeLinkIndex = -1;
  CmAuthControls: CustomerMgmt;
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {
    this.CmAuthControls = this.authorizationService.authorizationState.customer_management;
    this.navLinks = [
      {
        label: 'CUSTOMERS',
        link: './',
        index: 0,
        auth: this.CmAuthControls.cust_existing_customers_enabled
      },
      {
        label: 'PENDING FOR ACTIVATION',
        link: './pending-activation',
        index: 1,
        auth: this.CmAuthControls.cust_pending_for_activation_enabled
      }
    ];
  }
  ngOnInit(): void {
    console.log(this.navLinks.indexOf(this.navLinks.find((tab) => tab.auth)));
    if (this.navLinks.indexOf(this.navLinks.find((tab) => tab.auth)) === 0) {
      this.router.navigate(['customer-management']);
    } else if (this.navLinks.indexOf(this.navLinks.find((tab) => tab.auth)) === 1) {
      this.router.navigate(['customer-management/pending-activation']);
    }
    // this.router.events.subscribe((res) => {
    //   this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    // });
  }

}
