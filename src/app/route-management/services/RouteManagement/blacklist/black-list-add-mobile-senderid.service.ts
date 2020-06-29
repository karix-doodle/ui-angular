import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  MobileSenderidCotentBlackList_ApiResponse,
  MobileSenderidContentBlackList_AddResponse,
  MobileSenderidBlackList_DeleteResponse,
} from "../../../models/BlackList/blacklist.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BlackListAddMobileSenderidService {
  constructor(public http: HttpClient) {}

  baseurl = environment.serverUrl + "/routemgmt/blacklist/senderid/content";
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

   * @description gets all the senderid blacklist route datas
   */
  getBlSenderData(): Observable<MobileSenderidCotentBlackList_ApiResponse> {
    return this.http
      .post(this.baseurl + "/list", this.user)
      .pipe(map((data) => data as MobileSenderidCotentBlackList_ApiResponse));
  }

  /**
   *
   * @param body consists of senderid route data
   * @description adds the sender blacklist route data
   */
  addBlSender(
    body,
    formType
  ): Observable<MobileSenderidContentBlackList_AddResponse> {
    let blacklistSenderData: any;
    if (formType) {
      blacklistSenderData = body;
    } else {
      blacklistSenderData = { ...this.user, ...body };
    }
    return this.http
      .post(this.baseurl + "/add", blacklistSenderData)
      .pipe(map((data) => data as MobileSenderidContentBlackList_AddResponse));
  }

  /**
   *
   * @param body consists of sender blocklist data to delete
   * @description deletes the record
   */
  deleteBlSender(body): Observable<MobileSenderidBlackList_DeleteResponse> {
    return this.http
      .post(this.baseurl + "/delete", { ...this.user, ...body })
      .pipe(map((data) => data as MobileSenderidBlackList_DeleteResponse));
  }
}
