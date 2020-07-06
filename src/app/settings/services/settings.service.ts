import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SettingsTimeZone_ApiResponse,
  SettingsCurrency_ApiResponse,
  GsDefaultCountryOperator_ApiResponse,
  GsDefaultCountry_ApiResponse
} from '../models/settings.model';
import { User } from '../../shared/models/commonModels';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  baseUrl: string = environment.serverUrl + '/globalsetting';
  httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
  httpOptions_file = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'blob' as 'json' };

  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @description Settings TimeZone List
  */
  Globalsetting_timezone(): Observable<SettingsTimeZone_ApiResponse> {
    return this.http.get(this.baseUrl + '/timezone?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
      .pipe(map(m => m as SettingsTimeZone_ApiResponse));
  }

  /**
   * @description Settings Currency List
  */
  Globalsetting_currency(): Observable<SettingsCurrency_ApiResponse> {
    return this.http.get(this.baseUrl + '/currency?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
      .pipe(map(m => m as SettingsCurrency_ApiResponse));
  }

  /**
   * @description Default country operator List
  */
  Globalsetting_defaultCountryOperator(): Observable<GsDefaultCountryOperator_ApiResponse> {
    return this.http.get(this.baseUrl + '/defaultratecard/countryoperator?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
      .pipe(map(m => m as GsDefaultCountryOperator_ApiResponse));
  }

  /**
   * @description Default country List
  */
  Globalsetting_defaultCountry(): Observable<GsDefaultCountry_ApiResponse> {
    return this.http.get(this.baseUrl + '/defaultratecard/country?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
      .pipe(map(m => m as GsDefaultCountry_ApiResponse));
  }

  /**
   * @description Default rate card Download
  */
  GsDefaultCountryOperator_download(): Observable<any> {
    return this.http.get(this.baseUrl + '/defaultratecard/countryoperator/download?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  /**
   * @description Default rate card Download
  */
  GsDefaultCountry_download(): Observable<any> {
    return this.http.get(this.baseUrl + '/defaultratecard/country/download?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

}
