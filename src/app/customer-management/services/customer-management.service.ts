import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PendingUsers_ApiResponse, UserActivation_ApiResponse, TimeZonesApiResponse, ApiResponse_Generic, PoolRouteSearchRes } from '../models/customer-management.model';
import * as _ from 'lodash';

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
      };

      /**
       * @description Get timezones list
      */
     getTimeZones(): Observable<TimeZonesApiResponse> {
      return this.http.get(this.baseUrl + '/timezones', this.httpOptions)
        .pipe(map(m => m as TimeZonesApiResponse));
    };

    /**
       * @description Get gateways list
    */
    async getGateways(gw_type,msg_type,lcr_only) {
      return await this.http.get(this.baseUrl + '/gatewayslist?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid+ '&gw_type=' + gw_type+ '&msg_type=' + msg_type+ '&lcr_only=' + lcr_only, this.httpOptions)
        .toPromise();
    };

    /**
       * @description Get pool routes list
    */
    async getPoolRoutes(gw_type,msg_type,lcr_only) {
      return await this.http.get(this.baseUrl + '/poolroutes?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid+ '&gw_type=' + gw_type+ '&msg_type=' + msg_type+ '&lcr_only=' + lcr_only, this.httpOptions)
        .toPromise();
    };

    getMatchingPoolRoutes(gw_type,msg_type,lcr_only,searchtext) {
      return this.http
      .get(this.baseUrl + '/poolroutes?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid+ '&gw_type=' + gw_type+ '&msg_type=' + msg_type+ '&lcr_only=' + lcr_only+ '&searchtext=' + searchtext, this.httpOptions)
      .pipe(map((data) => data as PoolRouteSearchRes));
    };

  /**
   * @description Activate/Update account
  */
  saveUserDetails(body): Observable<ApiResponse_Generic> {
    return this.http.post(this.baseUrl + '/saveuserdetails', body, this.httpOptions)
      .pipe(map(m => m as ApiResponse_Generic));
  }

  /**
       * @description Calculare margin price
  */
  calculateMarginalPrice(queryParams): Observable<ApiResponse_Generic> {
      return this.http.get(this.baseUrl + `/showmargin?${queryParams}`, this.httpOptions)
        .pipe(map(m => m as ApiResponse_Generic));
  };

      

}