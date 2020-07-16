import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SettingsTimeZone_ApiResponse,
  SettingsCurrency_ApiResponse,
  GsDefaultCountryOperator_ApiResponse,
  GsDefaultCountry_ApiResponse,
  GsGlobalCountryOperator_ApiResponse,
  GsCountryOperatorEdit_ApiResponse,
  GsUserupdate_ApiResponse,
  GsCountryOperatorupdate_ApiResponse
} from '../models/settings.model';
import { User } from '../../shared/models/commonModels';
import { environment } from '../../../environments/environment';
import { AuthorizationService } from '../../service/auth/authorization.service';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  baseUrl: string = environment.serverUrl + '/globalsetting';
  httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
  httpOptions_file = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'blob' as 'json' };

  user: User = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid
  };

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService
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
   * @description Default country operator Download
  */
  GsDefaultCountryOperator_download(): Observable<any> {
    return this.http.get(this.baseUrl + '/defaultratecard/countryoperator/download?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  /**
   * @description Default country Download
  */
  GsDefaultCountry_download(): Observable<any> {
    return this.http.get(this.baseUrl + '/defaultratecard/country/download?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  /**
   * @description Global country operator List
  */
  Globalsetting_globalCountryOperator(): Observable<GsGlobalCountryOperator_ApiResponse> {
    return this.http.get(this.baseUrl + '/globalcountryoperator?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
      .pipe(map(m => m as GsGlobalCountryOperator_ApiResponse));
  }

  /**
   * @description Global Country operator Download
  */
  GsGlobalCountryOperator_download(): Observable<any> {
    return this.http.get(this.baseUrl + '/countryoperator/download?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  /**
   * @description Global country operator Edit
  */
  Globalsetting_countryOperatorEdit(id): Observable<GsCountryOperatorEdit_ApiResponse> {
    return this.http.get(this.baseUrl + '/countryoperator/edit?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid + '&countryoperatorid=' + id, this.httpOptions)
      .pipe(map(m => m as GsCountryOperatorEdit_ApiResponse));
  }

  /**
   * @description Settings users
  */
  Globalsetting_users(): Observable<any> {
    return this.http.get(this.baseUrl + '/usersetting?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
      .pipe(map(m => m as any));
  }

  /**
   * @description Settings user update
  */
  Globalsetting_update(body): Observable<GsUserupdate_ApiResponse> {
    return this.http.post(this.baseUrl + '/currencytimezone/update', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as GsUserupdate_ApiResponse));
  }

  /**
   * @description Country Operator update file
  */
  Globalsetting_updateCountryOperatorFile(body): Observable<GsCountryOperatorupdate_ApiResponse> {
    return this.http.post(this.baseUrl + '/countryoperator/update', body)
      .pipe(map(m => m as GsCountryOperatorupdate_ApiResponse));
  }

  /**
   * @description Country Operator update
  */
  Globalsetting_updateCountryOperator(body): Observable<GsCountryOperatorupdate_ApiResponse> {
    return this.http.post(this.baseUrl + '/countryoperator/update', { ...body, ...this.user }, this.httpOptions)
      .pipe(map(m => m as GsCountryOperatorupdate_ApiResponse));
  }

}
