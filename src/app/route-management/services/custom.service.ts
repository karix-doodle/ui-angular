import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomSummary, MobileCustom } from '../models/custom.model';

@Injectable({
  providedIn: 'root'
})

export class CustomService {

  baseUrl: string = environment.serverUrl + '/routemgmt/custom';
  httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }

  /**
   * @description gets the custom route summary
  */
  getCustomRouteSummary(): Observable<CustomSummary> {
    return this.http.post(this.baseUrl + '/summary', this.user, this.httpOptions)
      .pipe(map(data => data as CustomSummary));
  }

  // ======================== Mobile Custom Route Management =======================

  /**
   * @description gets all the mobile custom route data
  */
  getMobileCustomRoute(): Observable<MobileCustom> {
    return this.http.post(this.baseUrl + '/mobile/list', this.user, this.httpOptions)
      .pipe(map(data => data as MobileCustom));
  }
}
