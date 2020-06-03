import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LCRList, LCRStatusUpdate, LCRStatusUpdateRes } from '../../models/LeastCastRouting/lcr';
import { User } from '../../../shared/models/commonModels';

@Injectable({
  providedIn: 'root'
})

export class LcrService {

  baseUrl: string = environment.serverUrl + '/routemgmt/lcr/';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };
  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }

  /**
   * @description gets the Least Cost Routing List
  */
  getLCRList(): Observable<LCRList> {
    return this.http.post(this.baseUrl + 'listroutes', this.user, this.httpOptions)
      .pipe(map(m => m as LCRList));
  }

  /**
   * @description update gateway status
  */
  updateGatewayStatus(input: LCRStatusUpdate): Observable<LCRStatusUpdateRes> {
    return this.http.post(this.baseUrl + 'updatestatus', input, this.httpOptions)
      .pipe(map(m => m as LCRStatusUpdateRes));
  }
}
