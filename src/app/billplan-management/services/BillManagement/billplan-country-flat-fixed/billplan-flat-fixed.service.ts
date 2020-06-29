import { Injectable } from '@angular/core';
import { BillPlanCreateFlatFixed_ApiResponse } from 'src/app/billplan-management/models/BillManagement/blillplan.models';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/commonModels';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillplanFlatFixedService {
  baseUrl: string = environment.serverUrl + '/billplanmgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }

  BillPlanCreate(data): Observable<BillPlanCreateFlatFixed_ApiResponse> {
    let details = {
      ...data,
      loggedinempid: environment.loggedinempid
    }
    return this.http.post(this.baseUrl + '/createratecard', details, this.httpOptions)
      .pipe(map(m => m as BillPlanCreateFlatFixed_ApiResponse));
  }
}
