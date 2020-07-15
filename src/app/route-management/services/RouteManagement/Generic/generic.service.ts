import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CountriesListRes, OperatorsListBody, OperatorsListRes,
  GatewaysListBody, GatewaysListRes
} from '../../../models/RouteManagement/Generic/generic';
import { User } from '../../../../shared/models/commonModels';
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  baseUrl: string = environment.serverUrl + '/routemgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };
  user: User = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid
  };

  constructor(
    public http: HttpClient,
    private authorizationService: AuthorizationService
    ) { }

  /**
   * @description gets the route management countries list
   */
  getCountriesList(): Observable<CountriesListRes> {
    return this.http.post(this.baseUrl + '/listcountries', this.user, this.httpOptions)
      .pipe(map(m => m as CountriesListRes));
  }

  /**
   * @param input consists of country code.
   * @description gets the route management operators list.
   */
  getOperatorsList(input: OperatorsListBody): Observable<OperatorsListRes> {
    return this.http.post(this.baseUrl + '/listoperators', input, this.httpOptions)
      .pipe(map(m => m as OperatorsListRes));
  }

  /**
   * @param input consists of route type and user credentials.
   * @description gets the route management gateways list.
   */
  getGatewaysList(input: GatewaysListBody): Observable<GatewaysListRes> {
    return this.http.post<GatewaysListRes>(this.baseUrl + '/listgateways', input, this.httpOptions)
      .pipe(
        map(rawData => {
          if (rawData.responsestatus === environment.APIStatus.success.text &&
            rawData.responsecode > environment.APIStatus.success.code) {
            const modifiedData = rawData.data.map(rawProduct => {
              return { ...rawProduct, isSelected: false }; // added IsSelected key for dropdown.
            });
            rawData.data = modifiedData;
          }
          return rawData;
        }));
  }
}
