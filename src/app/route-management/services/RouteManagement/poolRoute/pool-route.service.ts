import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/commonModels';
import { PoolRouteListRes, SelectedPoolRoute, SelectedPoolRouteRes } from '../../../models/RouteManagement/PoolRoute/poolRoute';

@Injectable({
  providedIn: 'root'
})
export class PoolRouteService {

  baseUrl: string = environment.serverUrl + '/routemgmt/';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };
  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }

  /**
   * @description gets the pool route list
   */
  getPoolRouteList(): Observable<PoolRouteListRes> {
    return this.http.post(this.baseUrl + 'listpoolroutes', this.user, this.httpOptions)
      .pipe(map(m => m as PoolRouteListRes));
  }
  /**
   * @description gets the list of particular pool route details
   */
  viewPoolRouteDetailsList(input: SelectedPoolRoute): Observable<SelectedPoolRouteRes> {
    return this.http.post(this.baseUrl + 'viewpoolroute', input, this.httpOptions)
      .pipe(map(m => m as SelectedPoolRouteRes));
  }
}
