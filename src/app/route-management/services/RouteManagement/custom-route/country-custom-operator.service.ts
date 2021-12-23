import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import {
  CountryCustomApiResponse,
  MobileCustomSenderIdResponse,
} from "src/app/route-management/models/custom.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthorizationService } from '../../../../service/auth/authorization.service';

@Injectable({
  providedIn: "root",
})
export class CountryOperatorCustomService {
  formDetails: any;
  constructor(
    public http: HttpClient,
    public authorizationService: AuthorizationService) {}

  baseUrl: string = environment.serverUrl + "/routemgmt/custom/countryoperator";
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  user = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid,
  };

  /**
   *
   * @description gets all the country and operator custom route datas
   */
  getCustomCountryOperatorList(): Observable<CountryCustomApiResponse> {
    return this.http
      .post(this.baseUrl + "/list", this.user)
      .pipe(map((data) => data as CountryCustomApiResponse));
  }

  /**
   *
   * @param body consists of mobile custom route data
   * @description adds the country and operator custom route data
   */
  addCustomCountryOperator(
    body,
    formType: Boolean
  ): Observable<MobileCustomSenderIdResponse> {
    let customCountryOperatorData: any;
    if (formType) {
        customCountryOperatorData = body;
    } else {
        customCountryOperatorData = { ...this.user, ...body };
    }

    return this.http
      .post(this.baseUrl + "/add", customCountryOperatorData)
      .pipe(map((data) => (data as unknown) as MobileCustomSenderIdResponse));
  }

  /**
   *
   * @param body consists of custom country & operator data to delete
   * @description deletes the record
   */
  deleteCustomCountryOperator(body): Observable<MobileCustomSenderIdResponse> {
    return this.http
      .post(
        this.baseUrl + "/delete",
        { ...this.user, ...body },
        this.httpOptions
      )
      .pipe(map((data) => (data as unknown) as MobileCustomSenderIdResponse));
  }
}
