import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PendingUsers_ApiResponse, UserActivation_ApiResponse } from '../models/customer-management.model';

@Injectable({
    providedIn: 'root'
  })
export class CustomerManagementService {
    
    baseUrl: string = environment.serverUrl + '/customermgmt';
    httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
    httpOptions_file = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'blob' as 'json' };
    httpOptions_formdata = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;' }) };

    user = {
        loggedinusername: environment.loggedinusername,
        loggedinempid: environment.loggedinempid
    };

    constructor(private http: HttpClient) { }
    
      /**
       * @description List of users pending for activation
      */
      getUsersPendingForActivation(): Observable<PendingUsers_ApiResponse> {
        return this.http.get(this.baseUrl + '/listspendingesme?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
          .pipe(map(m => m as PendingUsers_ApiResponse));
      };

      /**
       * @description Get details of user pending for activation
      */
     getPendingUserDetails(esmeaddr): Observable<UserActivation_ApiResponse> {
        return this.http.get(this.baseUrl + '/getuserdetails?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid+ '&esmeaddr=' + esmeaddr, this.httpOptions)
          .pipe(map(m => m as UserActivation_ApiResponse));
      }

      

}