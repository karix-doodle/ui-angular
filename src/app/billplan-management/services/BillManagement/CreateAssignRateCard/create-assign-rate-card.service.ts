import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../shared/models/commonModels';
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import {
  RateCardSearchSuggestionParams,
  RateCardSearchRes,
  DeleteRatecardRes,
  BillPlanDetailsView_ApiResponse,
  AssigendRateCard_ApiResponse
} from '../../../models/CreateAssignRateCard/createAssignRateCard.model';

@Injectable({
  providedIn: 'root'
})
export class CreateAssignRateCardService {

  baseUrl: string = environment.serverUrl + '/billplanmgmt/';
  httpOptions = {
    headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' })
  };

  user: User = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid
  };

  constructor(
    public http: HttpClient,
    private authorizationService: AuthorizationService) { }

  getRateCardNameSuggestion(input: RateCardSearchSuggestionParams): Observable<RateCardSearchRes> {
    return this.http
      .get(
        `${this.baseUrl}ratecard/search?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&ratecardtype=${input.ratecardtype}&ratecardname=${input.ratecardname}`, this.httpOptions
      )
      .pipe(map((data) => data as RateCardSearchRes));
  }

  deleteRateCardFormBillPlan(data): Observable<DeleteRatecardRes> {
    return this.http.post(`${this.baseUrl}ratecard/delete`, { ...this.user, ...data }, this.httpOptions)
      .pipe(map((data) => data as DeleteRatecardRes));
  }

  assigendRateCard(data): Observable<AssigendRateCard_ApiResponse> {
    return this.http.put(`${this.baseUrl}ratecard/assigned`, { ...this.user, ...data }, this.httpOptions)
      .pipe(map((data) => data as AssigendRateCard_ApiResponse));
  }

  BillPlanDetailsView(data): Observable<BillPlanDetailsView_ApiResponse> {
    return this.http.get(`${this.baseUrl}view?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&billplanid=${data.billplanid}`, this.httpOptions)
      .pipe(map(m => m as BillPlanDetailsView_ApiResponse));
  }

}
