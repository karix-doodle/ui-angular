import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GtListing_ApiResponse,
  GtDetails_ApiResponse,
  GtStatusupdate_ApiResponse,
  GtDetailsCountryList_ApiResponse,
  GtSenderIdWhiteList_ApiResponse,
  GtDetailsViewLog_ApiResponse,
  GtTimeZone_ApiResponse,
  GtCurrency_ApiResponse
} from '../models/gateway-management.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GatewayManagementService {

  baseUrl: string = environment.serverUrl + '/gateway';
  httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
  httpOptions_file = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'blob' as 'json' };

  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @description Gateway management List
  */
  GtListing_list(): Observable<GtListing_ApiResponse> {
    return this.http.post(this.baseUrl + '/list', this.user, this.httpOptions)
      .pipe(map(m => m as GtListing_ApiResponse));
  }

  /**
   * @description Gateway management Download
  */
  GtListing_download(): Observable<any> {
    return this.http.get(this.baseUrl + '/download?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  /**
   * @description Gateway management Status update
  */
  GtListing_statusupdate(body): Observable<GtStatusupdate_ApiResponse> {
    return this.http.post(this.baseUrl + '/statusupdate', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtStatusupdate_ApiResponse));
  }

  /**
   * @description Gateway management Details
  */
  GatewayDetails_view(body): Observable<GtDetails_ApiResponse> {
    return this.http.post(this.baseUrl + '/view', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtDetails_ApiResponse));
  }

  /**
   * @description Gateway management Countrylist
  */
  Gateway_CountryList(body): Observable<GtDetailsCountryList_ApiResponse> {
    return this.http.post(this.baseUrl + '/countrylist', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtDetailsCountryList_ApiResponse));
  }

  /**
   * @description Gateway management Sender Id WhiteList
  */
  Gateway_SenderIdWhiteList(body): Observable<GtSenderIdWhiteList_ApiResponse> {
    return this.http.post(this.baseUrl + '/senderid/list', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtSenderIdWhiteList_ApiResponse));
  }

  /**
   * @description Gateway management Activity log
  */
  GtDetails_ViewLog(body): Observable<GtDetailsViewLog_ApiResponse> {
    return this.http.post(this.baseUrl + '/viewactivity', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtDetailsViewLog_ApiResponse));
  }

  /**
   * @description Gateway management TimeZone List
  */
  Gateway_timezone(): Observable<GtTimeZone_ApiResponse> {
    return this.http.post(this.baseUrl + '/timezone', this.user, this.httpOptions)
      .pipe(map(m => m as GtTimeZone_ApiResponse));
  }

  /**
   * @description Gateway management TimeZone List
  */
  Gateway_currency(): Observable<GtCurrency_ApiResponse> {
    return this.http.post(this.baseUrl + '/currency', this.user, this.httpOptions)
      .pipe(map(m => m as GtCurrency_ApiResponse));
  }

}
