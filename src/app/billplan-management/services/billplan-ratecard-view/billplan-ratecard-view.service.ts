import { Injectable } from '@angular/core';
import {  RateCardCountryOperatorView_ApiRResponse, RateCardCountryView_ApiRResponse, RateCardGroupView_ApiRResponse, RateCardSlabView_ApiRResponse } from '../../models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillplanRatecardViewService {

  baseUrl: string = environment.serverUrl + '/billplanmgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };



  constructor(public http: HttpClient) { }
  getRatecardCountryView(data): Observable<RateCardCountryView_ApiRResponse> {
    return this.http.get(`${this.baseUrl}/ratecard/view?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&ratecardid=${Number(data.id)}&ratecardtype=${data.type}`, this.httpOptions)
      .pipe(map(m => m as RateCardCountryView_ApiRResponse));
  }
  getRatecardCountryOperatorView(data): Observable<RateCardCountryOperatorView_ApiRResponse> {
    return this.http.get(`${this.baseUrl}/ratecard/view?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&ratecardid=${Number(data.id)}&ratecardtype=${data.type}`, this.httpOptions)
      .pipe(map(m => m as RateCardCountryOperatorView_ApiRResponse));
  }

  getRatecardfFlatFixedView(data): Observable<RateCardCountryOperatorView_ApiRResponse> {
    return this.http.get(`${this.baseUrl}/ratecard/view?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&ratecardid=${Number(data.id)}&ratecardtype=${data.type}`, this.httpOptions)
      .pipe(map(m => m as RateCardCountryOperatorView_ApiRResponse));
  }

  getRatecardGroupView(data): Observable<RateCardGroupView_ApiRResponse> {
    return this.http.get(`${this.baseUrl}/ratecard/view?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&ratecardid=${Number(data.id)}&ratecardtype=${data.type}`, this.httpOptions)
      .pipe(map(m => m as RateCardGroupView_ApiRResponse));
  }

  getRatecardSlabView(data): Observable<RateCardSlabView_ApiRResponse> {
    return this.http.get(`${this.baseUrl}/ratecard/view?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&ratecardid=${Number(data.id)}&ratecardtype=${data.type}`, this.httpOptions)
      .pipe(map(m => m as RateCardSlabView_ApiRResponse));
  }


}
