import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  MobileCustom_ApiResponse,
  MobileCustomResponse,
} from "src/app/route-management/models/custom.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MobileCustomRouteService {
  constructor(public http: HttpClient) {}
  baseUrl: string = environment.serverUrl + "/routemgmt/custom/mobile";
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
  /**
   * @description gets all the mobile custom route datas
   */
  getCustomMobileList(): Observable<MobileCustom_ApiResponse> {
    return this.http
      .post(this.baseUrl + "/list", this.user, this.httpOptions)
      .pipe(map((data) => data as MobileCustom_ApiResponse));
  }

  /**
   *
   * @param body consists of mobile custom route data
   * @description adds the mobile custom route data
   */
  addCustomMobile(body, formType: Boolean): Observable<MobileCustomResponse> {
    let customMobileData: any;
    if (formType) {
      customMobileData = body;
    } else {
      customMobileData = { ...this.user, ...body };
    }

    return this.http
      .post(this.baseUrl + "/add", customMobileData)
      .pipe(map((data) => data as MobileCustomResponse));
  }

  /**
   *
   * @param body consists of custom mobile data to delete
   * @description deletes the record|
   */
  deleteCustomMobile(body): Observable<MobileCustomResponse> {
    return this.http
      .post(
        this.baseUrl + "/delete",
        { ...this.user, ...body },
        this.httpOptions
      )
      .pipe(map((data) => (data as unknown) as MobileCustomResponse));
  }
}
