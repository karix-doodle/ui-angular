import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    console.log("canactivate");
    return this.canLoad();
  }

  canLoad() {
    console.log("canload:"+this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      console.log("inside authmgmt");
      this.router.navigate(['/authmgmt']);
    }
    return this.authService.isLoggedIn();
  }
}
