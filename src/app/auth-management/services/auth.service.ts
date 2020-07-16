import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private testRefresh = 'testrefresh';
  baseUrl: string = environment.serverUrl + '/authmgmt';
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  private isAccessTokenAvailableSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isAccessTokenAvailableObs = this.isAccessTokenAvailableSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  setIsAccessTokenAvailableState(state: boolean) {
    this.isAccessTokenAvailableSubject.next(state);
  }

  authenticateTokens(tokens: { accesstoken: string, refreshtoken: string }) {
    this.doLoginUser(this.user.loggedinusername, tokens);
    return of(true);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    // localStorage.setItem(this.JWT_TOKEN, tokens.accesstoken);
    this.storeJwtToken(tokens.accesstoken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshtoken);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // refresh token
  refreshToken() {
    return this.http.post<any>(`${this.baseUrl}/refreshToken`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((res) => {
      if (res.responsestatus === environment.APIStatus.success.text
        && res.responsecode > environment.APIStatus.success.code) {
        this.storeJwtToken(res.accesstoken);
      } else if (res.responsestatus === environment.APIStatus.error.text
        && res.responsecode < environment.APIStatus.error.code) {
        this.doLogoutUser();
      }

    }));
    // return this.storeJwtToken(this.testRefresh);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    this.setIsAccessTokenAvailableState(true);
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }



  // call on logout
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.router.navigate(['/dashboard']);
  }

}