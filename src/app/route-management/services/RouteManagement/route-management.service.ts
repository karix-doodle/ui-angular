import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouteMgmtSummary } from '../../models/RouteManagement/routeMgmt';
import { User } from '../../../shared/models/commonModels';
import { AuthorizationService } from '../../../service/auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementService {

  baseUrl: string = environment.serverUrl + '/routemgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };
  user: User = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid
  };

  constructor(
    public http: HttpClient,
    private authorizationService: AuthorizationService) { }

  /**
   * @description gets the route management summary
   */

  getRouteMgmtSummary(): Observable<RouteMgmtSummary> {
    return this.http.post(this.baseUrl + '/summary', this.user, this.httpOptions)
      .pipe(map(m => m as RouteMgmtSummary));
  }
}
