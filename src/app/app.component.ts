import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { AuthService } from './auth-management/services/auth.service';
import { AuthGuard } from './auth-management/guards/auth.guard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'erp-international';
  classApplied = false;
  isLoggedIn: boolean;
  sub: Subscription;
  constructor(
    // private authService: AuthService,
    private authGuard: AuthGuard
  ) { }

  ngOnInit() {
    this.isLoggedIn = true;
    this.initIsAuthorizedUser();
  }
  toggleClass() {
    this.classApplied = !this.classApplied;
  }
  initIsAuthorizedUser() {
    this.sub = this.authGuard.currentSubjectData.subscribe((isAuthorized) => {
      // console.log(isAuthorized, this.isJWTTokenExists());
      if (isAuthorized !== null) {
        this.isLoggedIn = isAuthorized;
      }
    });
  }
  // getJwtToken() {
  //   return localStorage.getItem(this.authService.JWT_TOKEN);
  // }

  // isJWTTokenExists() {
  //   return !!this.getJwtToken();
  // }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
