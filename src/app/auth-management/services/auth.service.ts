import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens, RequestType } from '../models/tokens';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly JWT_TOKEN = 'JWT_TOKEN';
  public readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private testRefresh = 'testrefresh';
  baseUrl: string = environment.serverUrl + '/authmgmt';
  requestTypeInput: RequestType = new RequestType();

  private isAccessTokenAvailableSubject: BehaviorSubject<RequestType> = new BehaviorSubject<RequestType>({ reqType: null, state: null });
  isAccessTokenAvailableObs = this.isAccessTokenAvailableSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  setIsAccessTokenAvailableState(data: RequestType) {
    this.isAccessTokenAvailableSubject.next(data);
  }

  authenticateTokens(tokens: { accesstoken: string, refreshtoken: string, reqType: string }) {
    this.storeTokens(tokens);
    return of(true);
  }


  private storeTokens(tokens: Tokens) {
    // localStorage.setItem(this.JWT_TOKEN, tokens.accesstoken);
    // this.storeJwtToken(tokens.accesstoken);
    localStorage.setItem(this.JWT_TOKEN, tokens.accesstoken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshtoken);
    this.requestTypeInput.reqType = tokens.reqType;
    this.requestTypeInput.state = true;
    this.setIsAccessTokenAvailableState(this.requestTypeInput);
  }



  // refresh token
  refreshToken() {
    return this.http.post<any>(`${this.baseUrl}/refreshToken`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((res: any) => {
      if (res.responsestatus === environment.APIStatus.success.text
        && res.responsecode > environment.APIStatus.success.code) {
        // this.storeJwtToken(res.accesstoken);
        localStorage.setItem(this.JWT_TOKEN, res.accesstoken);
      }
    }));
  }

  // private storeJwtToken(jwt: string) {
  //   localStorage.setItem(this.JWT_TOKEN, jwt);
  //   this.setIsAccessTokenAvailableState(true);
  // }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // call on logout
  // private doLogoutUser() {
  //   this.removeTokens();
  // }

  removeTokens() {
    this.requestTypeInput.reqType = null;
    this.requestTypeInput.state = false;
    this.setIsAccessTokenAvailableState(this.requestTypeInput);
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.router.navigate(['/']);
  }
}
