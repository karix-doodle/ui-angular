import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { } from '../../models/BillManagement/billplan-management.model';
import { User } from '../../../shared/models/commonModels';
import {
  BillPlanTableList_ApiResponse,
  BillPlanCurrency_ApiResponse,
  BlillPlanSumary_ApiResponse,
  BillPlanCountries_ApiRespone,
  BillPlanOperator_ApiRespone,
  CreateBillPlan_ApiResponse,
  GetNameCheck_ApiResponse,
  CurrencyRateBody,
  CurrencyRateRes
} from '../../models/BillManagement/blillplan.models';

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
    return this.http.get(`${this.baseUrl}/list?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
      .pipe(map((data) => data as BillPlanTableList_ApiResponse))
  }

  BillPlanListdownload(): Observable<any> {
    return this.http.get(`${this.baseUrl}/download?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions_file)
      .pipe(map(m => m as any));
  }

  createBillPlan(body): Observable<CreateBillPlan_ApiResponse> {
    return this.http.post(this.baseUrl + '/createbillplan', { ...this.user, ...body }, this.httpOptions)
      .pipe(map(m => m as CreateBillPlan_ApiResponse));
  }

  GetNameCheck(data, type): Observable<GetNameCheck_ApiResponse> {
    return this.http.get(`${this.baseUrl}/getnamecheck?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&name=${data}&type=${type}`, this.httpOptions)
      .pipe(map(m => m as GetNameCheck_ApiResponse));
  }

  BillPlancurrency(): Observable<BillPlanCurrency_ApiResponse> {
    return this.http.get(`${this.baseUrl}/currency?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
      .pipe(map(m => m as BillPlanCurrency_ApiResponse));
  }

  getBillPlanMgmtSummary(): Observable<BlillPlanSumary_ApiResponse> {
    return this.http.get(`${this.baseUrl}/summary?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
      .pipe(map((data) => data as BlillPlanSumary_ApiResponse))
  }

  getContinentList(): Observable<string[]> {
    return this.http.get(`${this.baseUrl}/continent?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
      .pipe(map((data) => data as string[]));
  }

  getCountryList(data): Observable<BillPlanCountries_ApiRespone> {
    return this.http.get(`${this.baseUrl}/country?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&continent=${data.continent}`, this.httpOptions)
      .pipe(map((data) => data as BillPlanCountries_ApiRespone))
  }
  getCountriesList(): Observable<BillPlanCountries_ApiRespone> {
    return this.http.get(`${this.baseUrl}/country?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}`, this.httpOptions)
      .pipe(map((data) => data as BillPlanCountries_ApiRespone))
  }

  getOperatorList(data): Observable<BillPlanOperator_ApiRespone> {
    return this.http.get(`${this.baseUrl}/operator?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&country_code=${data.country_code}`, this.httpOptions)
      .pipe(map((data) => data as BillPlanOperator_ApiRespone))
  }
  getCurrencyRate(formCurrencyId: number): Observable<CurrencyRateRes> {
    return this.http.get(`
    ${this.baseUrl}/currencyrate?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&fromcurrencyid=${formCurrencyId}&tocurrencyid=${environment.currencyDefault}
    `)
      .pipe(map((data) => data as CurrencyRateRes));
  }

}
