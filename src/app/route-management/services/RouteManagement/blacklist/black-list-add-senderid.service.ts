import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthorizationService } from '../../../../service/auth/authorization.service';
import {
  MobileBlackList_AddResponse,
  MobileSenderidBlackList_DeleteResponse,
  MobileSenderidBlackList_ApiResponse,
} from "../../../models/BlackList/blacklist.model";

@Injectable({
  providedIn: "root",
})
export class BlackListAddSenderidService {
  constructor(
    public http: HttpClient,
    private authorizationService: AuthorizationService) {}

  baseUrl = environment.serverUrl + "/routemgmt/blacklist/mobile/senderid";
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  user = {
    loggedinusername: this.authorizationService.authorizationState.loggedinusername,
    loggedinempid: this.authorizationService.authorizationState.loggedinempid
  };
  /**
   *
   * @param  consists of login user Data
   * @description gets all the mobile senderid blacklist route datas
   */
  getBlMobileSenderData(): Observable<MobileSenderidBlackList_ApiResponse> {
    return this.http.post(this.baseUrl + "/list", this.user).pipe(
      tap((data) => console.log(data)),
      map((data) => data as MobileSenderidBlackList_ApiResponse)
    );
  }

  /**
   *
   * @param body consists of mobile senderid route data
   * @description adds the mobile sender blacklist route data
   */
  addBlMobileSender(body, formType): Observable<MobileBlackList_AddResponse> {
    let blacklistMobileSenderData: any;
    if (formType) {
      blacklistMobileSenderData = body;
    } else {
      blacklistMobileSenderData = { ...this.user, ...body };
    }
    return this.http
      .post(this.baseUrl + "/add", blacklistMobileSenderData)
      .pipe(map((data) => data as MobileBlackList_AddResponse));
  }

  /**
   *
   * @param blMobileSenderData consists of mobile sender blocklist data to delete
   * @description deletes the record
   */
  deleteBlMobileSender(
    body
  ): Observable<MobileSenderidBlackList_DeleteResponse> {
    return this.http
      .post(this.baseUrl + "/delete", { ...this.user, ...body })
      .pipe(map((data) => data as MobileSenderidBlackList_DeleteResponse));
  }
}
