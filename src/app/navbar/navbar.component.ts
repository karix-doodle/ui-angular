import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../service/auth/authorization.service';
import { AuthService } from '../auth-management/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean;

  constructor(
    public authorizationService: AuthorizationService,
    public authService: AuthService) { }

  ngOnInit() {
  }
  onLogout() {
    if (this.authService.isLoggedIn()) {
      this.authService.removeTokens();
    }
  }

}
