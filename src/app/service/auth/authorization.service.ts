import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthorizationState, AuthorizationStateData } from '../../model/authorization.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl: string = environment.serverUrl + '/generic/';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  authorizationState: AuthorizationStateData;

  constructor(public http: HttpClient) { }


  getAuthorizationState(): Observable<AuthorizationState> {
    return this.http.get(
      `${this.baseUrl}authorization?loggedinusername=${environment.loggedinusername}&loggedinempid=129`,
      this.httpOptions)
      .pipe(
        tap((data: AuthorizationState) => {
          this.authorizationState = data.data;
        }),
        map((data) => data as AuthorizationState));
  }
}
