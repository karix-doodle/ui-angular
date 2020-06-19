import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { } from '../../models/BillManagement/billplan-management.model';
import { User } from '../../../shared/models/commonModels';
import { BillPlanTableList_ApiResponse, BillPlanCurrency_ApiResponse, BlillPlanSumary_ApiResponse, BillPlanCountries_ApiRespone } from '../../models/BillManagement/blillplan.models';

@Injectable({
  providedIn: 'root'
})

export class BillManagementService {

  baseUrl: string = environment.serverUrl + '/billplanmgmt';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };
  httpOptions_file = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'blob' as 'json' };

  user: User = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid
  };

  constructor(public http: HttpClient) { }

  getBillPlanMgmtTableList(): Observable<BillPlanTableList_ApiResponse> {

    return this.http.get(`${this.baseUrl}/list?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid.toString()}`, this.httpOptions)
    .pipe(map((data) => data as BillPlanTableList_ApiResponse))
  }


  BillPlanListdownload(): Observable<any> {
    return this.http.get(`${this.baseUrl}/download?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  BillPlancurrency(): Observable<BillPlanCurrency_ApiResponse> {
    return this.http.get(`${this.baseUrl}/currency?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
      .pipe(map(m => m as BillPlanCurrency_ApiResponse));
  }

  getBillPlanMgmtSummary(): Observable<BlillPlanSumary_ApiResponse> {

    return this.http.get(`${this.baseUrl}/summary?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
    .pipe(map((data) => data as BlillPlanSumary_ApiResponse))
  }

  getCountryList(): Observable<BillPlanCountries_ApiRespone> {

    return this.http.get(`${this.baseUrl}/country?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
    .pipe(map((data) => data as BillPlanCountries_ApiRespone))
  }

}
