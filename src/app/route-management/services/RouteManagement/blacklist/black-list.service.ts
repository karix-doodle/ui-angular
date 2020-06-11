import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  BlackListSummary_ApiResponse,
  BlackListGateway_ApiResponse,
} from '../../../models/BlackList/blacklist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlackListService {
  constructor(public http: HttpClient) {}
  baseUrl: string = environment.serverUrl + '/routemgmt';
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid,
  };
  /**
   * @description gets the Blacklist route summary
   */
  getBlackListSummary(): Observable<BlackListSummary_ApiResponse> {
    return this.http
      .post(this.baseUrl + '/blacklist/summary', this.user, this.httpOptions)
      .pipe(map((data) => data as BlackListSummary_ApiResponse));
  }

  /**
   * @description gets the Blacklist route summary
   */
  getBlackListGatewayList(): Observable<BlackListGateway_ApiResponse> {
    return this.http
      .post(this.baseUrl + '/listgateways', { ...this.user, ...{ gw_type: 'direct' } }, this.httpOptions)
      .pipe(map((data) => data as BlackListGateway_ApiResponse));
  }
}
