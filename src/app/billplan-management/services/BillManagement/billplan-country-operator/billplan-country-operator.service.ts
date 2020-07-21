import { Injectable } from '@angular/core';
import { BillPlanCreateCountryOperator_ApiResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/commonModels';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class BillplanCountryOperatorService {
  baseUrl: string = environment.serverUrl + '/billplanmgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  user: User = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid
  };

  constructor(
    public http: HttpClient,
    private authorizationService: AuthorizationService) { }

  BillPlanCreateCountryOperator(data): Observable<BillPlanCreateCountryOperator_ApiResponse> {
    let details = {
      ...data,
      loggedinempid: this.user.loggedinempid
    }
    return this.http.post(this.baseUrl + '/createratecard/countryoperator', details, this.httpOptions)
      .pipe(map(m => m as BillPlanCreateCountryOperator_ApiResponse));
  }
}
