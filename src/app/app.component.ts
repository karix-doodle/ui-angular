import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AuthorizationService } from './service/auth/authorization.service';
import { AuthService } from './auth-management/services/auth.service';
import { AuthGuard } from './auth-management/guards/auth.guard';
import { AuthorizationStateData, AuthorizationState } from './model/authorization.model';
import { environment } from '../environments/environment';
import { errorAlert } from './shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestType } from './auth-management/models/tokens';

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
  message: string;
  isLogoutEvent: boolean;
  sideNavAuthData: Subject<AuthorizationState> = new Subject<AuthorizationState>();

  constructor(
    private authGuard: AuthGuard,
    private authorizationService: AuthorizationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.stateBoolean = true;
    if (this.isJWTTokenExists()) {
      this.stateBoolean = false;
      this.getAuthorizationState();
    }
  }

  ngOnInit() {
    this.isLoggedIn = true;
    this.isLogoutEvent = false;
    this.initIsAuthorizedUserSub();
    this.initIsAccessTokenAvailableSub();
  }
  getAuthorizationState(requestRouteType?: string) {
    this.authorizationService.getAuthorizationState().subscribe(
      (res: AuthorizationState) => {
        if (res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code) {
          this.stateBoolean = true;
          this.state = res.data;
          setTimeout(() => {
            this.sideNavAuthData.next(res);
          }, 100);
          // console.log(requestRouteType);
          if (requestRouteType === 'billplan') {
            this.router.navigate(['/billplan-management']);
          }
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
        if (!this.isLogoutEvent) {
          this.message = environment.invalidSessionMsg;
          // console.log(isAuthorized, this.isLogoutEvent);
          if (!isAuthorized) {
            this.removeTokens();
          }
        }
      }
    });
  }
  initIsAccessTokenAvailableSub() {
    this.sub = this.authService.isAccessTokenAvailableObs.subscribe((isTokenAvailable: RequestType) => {
      // console.log(isTokenAvailable);
      if (isTokenAvailable.state === true) {
        // this.stateBoolean = true;
        this.getAuthorizationState(isTokenAvailable.reqType);
        this.isLogoutEvent = false;
      } else if (isTokenAvailable.state === false) {
        // console.log(isTokenAvailable);
        this.isLogoutEvent = true;
        this.message = environment.userLoggedOutMsg;
      }
    });
  }
  removeTokens() {
    localStorage.removeItem(this.authService.JWT_TOKEN);
    localStorage.removeItem(this.authService.REFRESH_TOKEN);
    this.router.navigate(['/']);
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
