import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GtListing_ApiResponse,
  GtCreate_ApiResponse,
  GtEdit_ApiResponse,
  GtDetails_ApiResponse,
  GtAddedCountryList_ApiResponse,
  GtInactiveCountryList_ApiResponse,
  GtPriceChangeCountryList_ApiResponse,
  GtUpdate_ApiResponse,
  GtStatusupdate_ApiResponse,
  GtDetailsCountryList_ApiResponse,
  GtSenderIdWhiteList_ApiResponse,
  GtSenderIdWhiteListDelete_ApiResponse,
  GtDetailsViewLog_ApiResponse,
  GtTimeZone_ApiResponse,
  GtCurrency_ApiResponse,
  GtCountryStatusupdate_ApiResponse,
  GtFileAuditLog_ApiResponse,
  GtFileAuditFileLog_ApiResponse
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
   * @description Gateway management create
  */
  Gateway_create(body): Observable<GtCreate_ApiResponse> {
    return this.http.post(this.baseUrl + '/create', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtCreate_ApiResponse));
  }

  /**
   * @description Gateway management Edit
  */
  Gateway_Edit(body): Observable<GtEdit_ApiResponse> {
    return this.http.post(this.baseUrl + '/edit', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtEdit_ApiResponse));
  }

  /**
   * @description Gateway management Update
  */
  Gateway_update(body): Observable<GtUpdate_ApiResponse> {
    return this.http.post(this.baseUrl + '/update', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtUpdate_ApiResponse));
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
   * @description Gateway details added country popup
  */
  GtAddedCountry_list(data): Observable<GtAddedCountryList_ApiResponse> {
    return this.http.get(this.baseUrl + '/addedcountrylist?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid + '&gw_id=' + data.gw_id + '&gw_name=' + data.gw_name, this.httpOptions)
      .pipe(map(m => m as GtAddedCountryList_ApiResponse));
  }

  /**
   * @description Gateway details inactive country popup
  */
  GtInactiveCountry_list(data): Observable<GtInactiveCountryList_ApiResponse> {
    return this.http.get(this.baseUrl + '/inactivecountrylist?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid + '&gw_id=' + data.gw_id + '&gw_name=' + data.gw_name, this.httpOptions)
      .pipe(map(m => m as GtInactiveCountryList_ApiResponse));
  }

  /**
   * @description Gateway details price change country popup
  */
  GtPriceChangeCountry_list(data): Observable<GtPriceChangeCountryList_ApiResponse> {
    return this.http.get(this.baseUrl + '/pricechangecountrylist?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid + '&gw_id=' + data.gw_id + '&gw_name=' + data.gw_name, this.httpOptions)
      .pipe(map(m => m as GtPriceChangeCountryList_ApiResponse));
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
   * @description Gateway management Sender Id WhiteList delete
  */
  Gateway_SenderIdWhiteListDelete(body): Observable<GtSenderIdWhiteListDelete_ApiResponse> {
    return this.http.post(this.baseUrl + '/senderid/delete', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtSenderIdWhiteListDelete_ApiResponse));
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
   * @description Gateway management Currency List
  */
  Gateway_currency(): Observable<GtCurrency_ApiResponse> {
    return this.http.post(this.baseUrl + '/currency', this.user, this.httpOptions)
      .pipe(map(m => m as GtCurrency_ApiResponse));
  }

  /**
   * @description Gateway management Country Status update
  */
  GtCountry_statusupdate(body): Observable<GtCountryStatusupdate_ApiResponse> {
    return this.http.post(this.baseUrl + '/countrystatus', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtCountryStatusupdate_ApiResponse));
  }

  /**
   * @description Gateway management Download
  */
  GtCountryListing_download(data): Observable<any> {
    return this.http.get(this.baseUrl + '/download/country?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid + '&gw_id=' + data.gw_id + '&gw_name=' + data.gw_name, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  /**
   * @description Gateway management File audit log
  */
  GtFileAuditLog_list(body): Observable<GtFileAuditLog_ApiResponse> {
    return this.http.post(this.baseUrl + '/auditlog', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtFileAuditLog_ApiResponse));
  }

  /**
   * @description Gateway management File audit log
  */
  GtFileAuditFileLog_list(body): Observable<GtFileAuditFileLog_ApiResponse> {
    return this.http.post(this.baseUrl + '/auditfilelog', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GtFileAuditFileLog_ApiResponse));
  }

  /**
   * @description Gateway management Download
  */
  GtFileAuditLog_download(data): Observable<any> {
    return this.http.get(this.baseUrl + '/download/auditlog/?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid + '&gw_id=' + data.gw_id + '&filename=' + data.filename, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

}
