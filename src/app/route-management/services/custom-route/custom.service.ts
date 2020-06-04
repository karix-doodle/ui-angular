import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CustomSummary_ApiResponse,
  CustomGateway_ApiResponse,
} from '../../models/custom.model';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  baseUrl: string = environment.serverUrl + '/routemgmt/';
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

  constructor(public http: HttpClient) {}

  /**
   * @description gets the custom route summary
   */
  getCustomRouteSummary(): Observable<CustomSummary_ApiResponse> {
    return this.http
      .post(this.baseUrl + '/custom/summary', {...this.user , ...{ gw_type: 'direct' }}, this.httpOptions)
      .pipe(map((data) => data as CustomSummary_ApiResponse));
  }

  getCustomRouteGateways(): Observable<CustomGateway_ApiResponse> {
    return this.http
      .post(
        this.baseUrl + '/listgateways',
        { ...this.user, ...{ gw_type: 'direct' } },
        this.httpOptions
      )
      .pipe(map((data) => data as CustomGateway_ApiResponse));
  }
}
