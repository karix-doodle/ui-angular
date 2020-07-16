import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from './service/auth/authorization.service';
import { AuthService } from './auth-management/services/auth.service';
import { AuthGuard } from './auth-management/guards/auth.guard';
import { AuthorizationStateData, AuthorizationState } from './model/authorization.model';
import { environment } from '../environments/environment';
import { errorAlert } from './shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'erp-international';
  classApplied = false;
  isLoggedIn: boolean;
  sub: Subscription;
  state: AuthorizationStateData;
  stateBoolean: boolean;

  constructor(
  private authGuard: AuthGuard,
  private authorizationService: AuthorizationService
  ) {
    this.stateBoolean = false;
  }

  ngOnInit() {
    this.isLoggedIn = true;
    this.initIsAuthorizedUser();
    
    this.authorizationService.getAuthorizationState().subscribe(
      (res: AuthorizationState) => {
        if (res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code) {
          // console.log(res);
          this.stateBoolean = true;
          this.state = res.data;
        } else if (res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.responsestatus);
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
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
