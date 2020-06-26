import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BillPlanCreateGroup_ApiResponse
} from '../../../models/BillManagement/blillplan.models';
import { User } from '../../../../shared/models/commonModels';
import { } from '../../../models/BillManagement/Group/groupRoute.model';

@Injectable({
  providedIn: 'root'
})

export class GroupRouteService {

  baseUrl: string = environment.serverUrl + '/billplanmgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }


  BillPlanCreateGroup(data): Observable<BillPlanCreateGroup_ApiResponse> {
    let details = {
      ...data,
      loggedinempid: environment.loggedinempid
    }
    return this.http.post(this.baseUrl + '/createratecard/group', details, this.httpOptions)
      .pipe(map(m => m as BillPlanCreateGroup_ApiResponse));
  }

}
