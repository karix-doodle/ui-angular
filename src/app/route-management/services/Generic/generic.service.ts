import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountriesListRes, OperatorsListBody, OperatorsListRes, GatewaysListBody, GatewaysListRes } from '../../models/Generic/generic';
import { User } from '../../../shared/models/commonModels';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  baseUrl: string = environment.serverUrl + '/routemgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };
  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }

  /**
   * @description gets the route management countries list
  */
  getCountriesList(): Observable<CountriesListRes> {
    return this.http.post(this.baseUrl + '/listcountries', this.user, this.httpOptions)
      .pipe(map(m => m as CountriesListRes));
  }

  /**
    * @description gets the route management operators list
   */
  getOperatorsList(input: OperatorsListBody): Observable<OperatorsListRes> {
    return this.http.post(this.baseUrl + '/listoperators', input, this.httpOptions)
      .pipe(map(m => m as OperatorsListRes));
  }

  /**
    * @description gets the route management gateways list
   */
  getGatewaysList(input: GatewaysListBody): Observable<GatewaysListRes> {
    return this.http.post(this.baseUrl + '/listgateways', input, this.httpOptions)
      .pipe(map(m => m as GatewaysListRes));
  }
}
