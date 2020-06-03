import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import {
  MobileCustomSenderId_ApiResponse,
  MobileCustomSenderIdResponse,
} from "src/app/route-management/models/custom.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MobileSenderidCustomService {
  formDetails: any;
  constructor(public http: HttpClient) {}

  baseUrl: string = environment.serverUrl + "/routemgmt/custom/mobilesenderid";
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
   *
   * @description gets all the mobile & senderid custom route datas
   */
  getCustomMobileSenderidList(): Observable<MobileCustomSenderId_ApiResponse> {
    return this.http
      .post(this.baseUrl + "/list", this.user)
      .pipe(map((data) => data as MobileCustomSenderId_ApiResponse));
  }

  /**
   *
   * @param body consists of mobile custom route data
   * @description adds the mobile and senderid custom route data
   */
  addCustomMobileSenderid(
    details,
    formType
  ): Observable<MobileCustomSenderIdResponse> {
    if (formType) {
      this.formDetails = new FormData();
      for (const key in details) {
        this.formDetails.append(key, details[key]);
      }
      for (const key in this.user) {
        this.formDetails.append(key, this.user[key]);
      }
    } else {
      this.formDetails = { ...this.user, ...details };
    }

    return this.http
      .post(this.baseUrl + "/add", this.formDetails, this.httpOptions)
      .pipe(map((data) => data as MobileCustomSenderIdResponse));
  }

  /**
   *
   * @param body consists of custom mobile & senderid data to delete
   * @description deletes the record
   */
  deleteCustomMobileSenderid(body): Observable<MobileCustomSenderIdResponse> {
    return this.http
      .post(
        this.baseUrl + "/delete",
        { ...this.user, ...body },
        this.httpOptions
      )
      .pipe(map((data) => data as MobileCustomSenderIdResponse));
  }
}
