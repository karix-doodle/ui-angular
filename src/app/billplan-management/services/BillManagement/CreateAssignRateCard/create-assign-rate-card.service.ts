import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  RateCardSearchSuggestionParams, RateCardSearchRes, DeleteRatecardRes, DeteletRatecardBody
} from '../../../models/CreateAssignRateCard/createAssignRateCard.model';

@Injectable({
  providedIn: 'root'
})
export class CreateAssignRateCardService {

  baseUrl: string = environment.serverUrl + '/billplanmgmt/';
  httpOptions = {
    headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  getRateCardNameSuggestion(input: RateCardSearchSuggestionParams): Observable<RateCardSearchRes> {
    return this.http
      .get(
        `${this.baseUrl}ratecard/search?loggedinusername=${input.loggedinusername}&loggedinempid=${input.loggedinempid}&ratecardtype=${input.ratecardtype}&ratecardname=${input.ratecardname}`, this.httpOptions
      )
      .pipe(map((data) => data as RateCardSearchRes));
  }

  deleteRateCardFormBillPlan(input: DeteletRatecardBody): Observable<DeleteRatecardRes> {
    const options = {
      headers: this.httpOptions.headers,
      body: input
    };
    return this.http.delete(`${this.baseUrl}ratecard/delete`, options)
      .pipe(map((data) => data as DeleteRatecardRes));
  }
}
