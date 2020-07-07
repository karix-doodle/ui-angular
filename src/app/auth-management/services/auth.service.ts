import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
  })
 
export class AuthService {
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string;
    private testRefresh:string = 'testrefresh';
    baseUrl: string = environment.serverUrl + '/authmgmt';
    user = {
        loggedinusername: environment.loggedinusername,
        loggedinempid: environment.loggedinempid
    };

    constructor(private http: HttpClient) {}

      authenticateTokens(tokens:{accesstoken:string,refreshtoken:string})
      {
        console.log(`Tokens:${JSON.stringify(tokens)}`);
        this.doLoginUser(this.user.loggedinusername,tokens)
        return of(true);
      }

      private doLoginUser(username: string, tokens: Tokens) {
        this.loggedUser = username;
        this.storeTokens(tokens);
      }

      private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.JWT_TOKEN, tokens.accesstoken);
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
          'refreshToken': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
          console.log(`refresh tokens:${JSON.stringify(tokens)}`)
          this.storeJwtToken(tokens.accesstoken);
        }));
       // return this.storeJwtToken(this.testRefresh);
      }

      private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
      }
      private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
      }

     

      //call on logout
      private doLogoutUser() {
        this.loggedUser = null;
        this.removeTokens();
      }

      private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
      }

}