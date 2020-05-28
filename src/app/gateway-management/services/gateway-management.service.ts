import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/gateway-management.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GatewayManagementService {

  baseUrl: string = environment.serverUrl + '/gateway';
  httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description gets the Gateway management List
  */
  getGatewayList(): Observable<ApiResponse> {
    return this.http.post(this.baseUrl + '/list', this.user, this.httpOptions)
      .pipe(map(m => m as ApiResponse));
  }

}
