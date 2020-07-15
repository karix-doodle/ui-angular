import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../service/auth/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean;

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

}
