import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cm-list',
  templateUrl: './cm-list.component.html',
  styleUrls: ['./cm-list.component.css']
})
export class CmListComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
 
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'CUSTOMERS',
            link: './',
            index: 0
        }, 
        {
            label: 'PENDING FOR ACTIVATION',
            link: './pending-activation',
            index: 1
        } 
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}
