import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from './service/auth/authorization.service';
import { AuthService } from './auth-management/services/auth.service';
import { AuthGuard } from './auth-management/guards/auth.guard';
import { AuthorizationStateData, AuthorizationState } from './model/authorization.model';
import { environment } from '../environments/environment';
import { errorAlert } from './shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  state: AuthorizationStateData;
  stateBoolean: boolean;

  constructor(
    private authGuard: AuthGuard,
    private authorizationService: AuthorizationService,
    private authService: AuthService,
    private router: Router
  ) {
    // this.stateBoolean = true;
    // if (this.isJWTTokenExists()) {
      this.stateBoolean = false;
      this.getAuthorizationState();
    // }
  }

  ngOnInit() {
    this.isLoggedIn = true;
    this.initIsAuthorizedUserSub();
    this.initIsAccessTokenAvailableSub();
  }
  getAuthorizationState() {
    this.authorizationService.getAuthorizationState().subscribe(
      (res: AuthorizationState) => {
        if (res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code) {
          this.stateBoolean = true;
          this.state = res.data;
        } else if (res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code) {
          this.stateBoolean = false;
          this.isLoggedIn = false;
          errorAlert(res.message, res.responsestatus);
          this.router.navigate(['/dashboard']);
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
  toggleClass() {
    this.classApplied = !this.classApplied;
  }
  initIsAuthorizedUserSub() {
    this.sub = this.authGuard.isUserAuthorizedObs.subscribe((isAuthorized) => {
      if (isAuthorized !== null) {
        this.isLoggedIn = isAuthorized;
      }
    });
  }
  initIsAccessTokenAvailableSub() {
    this.sub = this.authService.isAccessTokenAvailableObs.subscribe((isTokenAvailable) => {
      if (isTokenAvailable) {
        // this.stateBoolean = true;
        this.getAuthorizationState();
      }
    });
  }
  getJwtToken() {
    return localStorage.getItem(this.authService.JWT_TOKEN);
  }

  isJWTTokenExists() {
    return !!this.getJwtToken();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
