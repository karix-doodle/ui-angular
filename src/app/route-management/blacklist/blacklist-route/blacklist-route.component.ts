import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blacklist-route',
  templateUrl: './blacklist-route.component.html',
  styleUrls: ['./blacklist-route.component.css']
})
export class BlacklistRouteComponent implements OnInit {

 
  navLinks: any[];
  activeLinkIndex = -1;
 
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'MOBILE NUMBER',
            link: './mobile',
            index: 0
        }, 
        {
            label: 'SENDERID AND CONTENT',
            link: './sender-id',
            index: 1
        } ,
        {
          label: 'MOBILE AND SENDERID',
          link: './mobile-sender-id',
          index: 2
      } 
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}
