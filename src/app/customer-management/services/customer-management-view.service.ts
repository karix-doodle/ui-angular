import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import {
  EsmeaddrApi_Response,
  EssmeddrRateCardList_ApiResponse,
  viewLogApi_Response,
  AllowedCountryOperatorList,
  AllowedCountryApi_Response,
  AllowedOperatorApi_Response,
  AddSenderIdApi_Response,
  GetSenderisApi_Response,
  SenderIdsApi_Response,
  BlockedSenderIdsApi_Response,
} from "../models/customer-management.model";

@Injectable({
  providedIn: "root",
})
export class CustomerManagementService {
  baseUrl: string = environment.serverUrl + "/customermgmt";
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  httpOptions_file = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    responseType: "blob" as "json",
  };
  httpOptions_formdata = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data;" }),
  };

  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid,
  };

  constructor(private http: HttpClient) {}

  getEsmeaddrDetails(data: number): Observable<EsmeaddrApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getparticularesmeaddrdetails?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as EsmeaddrApi_Response));
  }

  getEsmeaddrRateCardDetails(
    data: number
  ): Observable<EssmeddrRateCardList_ApiResponse> {
    return this.http
      .get(
        `${this.baseUrl}/getratecarddetails?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as EssmeddrRateCardList_ApiResponse));
  }

  getSenderidList(
    data: number
  ): Observable<SenderIdsApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getsenderidsofesmeaddr?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as SenderIdsApi_Response));
  }
  getBlockedSenderidList(
    data: number
  ): Observable<BlockedSenderIdsApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getblockedsenderidsofesmeaddr?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as BlockedSenderIdsApi_Response));
  }

  getviewLogDetails(data): Observable<viewLogApi_Response>{
    return this.http.get(
      `${this.baseUrl}/getviewactivity?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data.esmeaddr}&clientname=${data.clientname}&dateselectiontype=${data.dateselectiontype}&fromdate=${data.fromdate}&todate=${data.todate}`,
      this.httpOptions
    )
    .pipe(map((data) => data as viewLogApi_Response))
  }
  getviewLogFileDownload(data): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/getdownloadactivity?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data.esmeaddr}&clientname=${data.clientname}&dateselectiontype=${data.dateselectiontype}&fromdate=${data.fromdate}&todate=${data.todate}`,
      this.httpOptions_file
    )
    .pipe(map((data) => data as any))
  }

  getAllowedOperatorlistdDetails(
    data: number
  ): Observable<AllowedCountryOperatorList> {
    return this.http
      .get(
        `${this.baseUrl}/allowedcountryoperatorslist?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as AllowedCountryOperatorList));
  }

  getAllowedCOuntylist(
    data
  ): Observable<AllowedCountryApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/allowedcountryoperators?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data.esmeaddr}&load=${data.load}`,
        this.httpOptions
      )
      .pipe(map((data) => data as AllowedCountryApi_Response));
  }

  getAllowedOperatorlist(
    data
  ): Observable<AllowedOperatorApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/allowedcountryoperators?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data.esmeaddr}&load=${data.load}&mcc=${data.mcc}`,
        this.httpOptions
      )
      .pipe(map((data) => data as AllowedOperatorApi_Response));
  }
  addSenderidSubmit(
    data
  ): Observable<AddSenderIdApi_Response> {
    return this.http
      .post(
        `${this.baseUrl}/addsenderids`, {...data , ...this.user},
        this.httpOptions
      )
      .pipe(map((data) => data as AddSenderIdApi_Response));
  }

  getSenderidsList(
    data
  ): Observable<GetSenderisApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getsenderids?loggedinusername=${environment.loggedinusername}&loggedinempid=${environment.loggedinempid}&esmeaddr=${data.esmeaddr}&mcc=${data.mcc}&mnc=${data.mnc}`,
        this.httpOptions
      )
      .pipe(map((data) => data as GetSenderisApi_Response));
  }
}
