import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import { AuthorizationService } from '../../service/auth/authorization.service';
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
  BillOnSubmissionCountryListApi_Response,
  AssignedServiceApi_Response,
  BlacklistTemplateApi_Response,
  BlockedTemplateListApi_Response,
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
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid,
  };

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService) {}

  getEsmeaddrDetails(data: number): Observable<EsmeaddrApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getparticularesmeaddrdetails?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as EsmeaddrApi_Response));
  }

  getAssignedServiceDetails(data: number): Observable<AssignedServiceApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getmediaandserviceofesmeaddr?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as AssignedServiceApi_Response));
  }

  getEsmeaddrRateCardDetails(
    data: number
  ): Observable<EssmeddrRateCardList_ApiResponse> {
    return this.http
      .get(
        `${this.baseUrl}/getratecarddetails?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as EssmeddrRateCardList_ApiResponse));
  }

  getSenderidList(
    data: number
  ): Observable<SenderIdsApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getsenderidsofesmeaddr?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as SenderIdsApi_Response));
  }

  getBlacklistTemplateList(
    data: number
  ): Observable<BlacklistTemplateApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getwhitelistedtemplatesofesmeaddr?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as BlacklistTemplateApi_Response));
  }

  getBlockedtemplateTpeList(
    data: number
  ): Observable<BlockedTemplateListApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getblockedtemplatesofesmeaddr?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as BlockedTemplateListApi_Response));
  }
  getBlockedSenderidList(
    data: number
  ): Observable<BlockedSenderIdsApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getblockedsenderidsofesmeaddr?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as BlockedSenderIdsApi_Response));
  }

  getviewLogDetails(data): Observable<viewLogApi_Response>{
    return this.http.get(
      `${this.baseUrl}/getviewactivity?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data.esmeaddr}&clientname=${data.clientname}&dateselectiontype=${data.dateselectiontype}&fromdate=${data.fromdate}&todate=${data.todate}`,
      this.httpOptions
    )
    .pipe(map((data) => data as viewLogApi_Response))
  }
  getviewLogFileDownload(data): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/getdownloadactivity?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data.esmeaddr}&clientname=${data.clientname}&dateselectiontype=${data.dateselectiontype}&fromdate=${data.fromdate}&todate=${data.todate}`,
      this.httpOptions_file
    )
    .pipe(map((data) => data as any))
  }

  getAllowedOperatorlistdDetails(
    data: number
  ): Observable<AllowedCountryOperatorList> {
    return this.http
      .get(
        `${this.baseUrl}/allowedcountryoperatorslist?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as AllowedCountryOperatorList));
  }

  getAllowedCOuntylist(
    data
  ): Observable<AllowedCountryApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/allowedcountryoperators?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data.esmeaddr}&load=${data.load}`,
        this.httpOptions
      )
      .pipe(map((data) => data as AllowedCountryApi_Response));
  }

  getBillSubmissionCountylist(
    data: number
  ): Observable<BillOnSubmissionCountryListApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/countrieslistforbillonsubmission?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data}`,
        this.httpOptions
      )
      .pipe(map((data) => data as BillOnSubmissionCountryListApi_Response));
  }
  getAllowedOperatorlist(
    data
  ): Observable<AllowedOperatorApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/allowedcountryoperators?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data.esmeaddr}&load=${data.load}&mcc=${data.mcc}`,
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

  addBillOnubmit(
    data
  ): Observable<AddSenderIdApi_Response> {
    return this.http
      .post(
        `${this.baseUrl}/setbillonsubmission`, {...data , ...this.user},
        this.httpOptions
      )
      .pipe(map((data) => data as AddSenderIdApi_Response));
  }

  getSenderidsList(
    data
  ): Observable<GetSenderisApi_Response> {
    return this.http
      .get(
        `${this.baseUrl}/getsenderids?loggedinusername=${this.user.loggedinusername}&loggedinempid=${this.user.loggedinempid}&esmeaddr=${data.esmeaddr}&mcc=${data.mcc}&mnc=${data.mnc}`,
        this.httpOptions
      )
      .pipe(map((data) => data as GetSenderisApi_Response));
  }
}
