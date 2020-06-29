import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  CustomSummary_ApiResponse,
  CustomGateway_ApiResponse,
} from "../../../models/custom.model";
import {
  CountriesListRes,
  OperatorsListBody,
  OperatorsListRes,
} from "../../../models/RouteManagement/Generic/generic";

@Injectable({
  providedIn: "root",
})
export class CustomService {
  baseUrl: string = environment.serverUrl + "/routemgmt/";
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid,
  };

  constructor(public http: HttpClient) {}

  /**
   * @description gets the custom route summary
   */
  getCustomRouteSummary(): Observable<CustomSummary_ApiResponse> {
    return this.http
      .post(
        this.baseUrl + "/custom/summary",
        { ...this.user, ...{ gw_type: "direct" } },
        this.httpOptions
      )
      .pipe(map((data) => data as CustomSummary_ApiResponse));
  }

  /**
   * @description gets the custom route listgateways
   */

  getCustomRouteGateways(): Observable<CustomGateway_ApiResponse> {
    return this.http
      .post(
        this.baseUrl + "/listgateways",
        { ...this.user, ...{ gw_type: "direct" } },
        this.httpOptions
      )
      .pipe(map((data) => data as CustomGateway_ApiResponse));
  }

  /**
   * @description gets the custom route countrieslist
   */
  getCountriesList(): Observable<CountriesListRes> {
    return this.http
      .post(this.baseUrl + "/listcountries", this.user, this.httpOptions)
      .pipe(map((m) => m as CountriesListRes));
  }

  /**
   * @description gets the route management operators list
   */
  getOperatorsList(input: OperatorsListBody): Observable<OperatorsListRes> {
    return this.http
      .post(this.baseUrl + "/listoperators", input, this.httpOptions)
      .pipe(map((m) => m as OperatorsListRes));
  }
}
