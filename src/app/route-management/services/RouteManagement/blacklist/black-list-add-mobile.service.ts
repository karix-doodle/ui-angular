import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BlackListSummary_ApiResponse,
  MobileBlackList_ApiResponse,
  MobileBlackList_AddResponse,
  MobileBlackList_DeleteResponse,
  BlackListGateway_ApiResponse,
} from '../../../models/BlackList/blacklist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BlackListAddMobileService {
  constructor(public http: HttpClient) {}
  baseUrl: string = environment.serverUrl + '/routemgmt/blacklist/';
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid,
  };


  /**
   *
   * @param userData consists of login user Data
   * @description gets all the mobile blacklist route datas
   */
  getBlackListMobile(): Observable<MobileBlackList_ApiResponse> {
    return this.http
      .post(this.baseUrl + 'mobile/list', this.user)
      .pipe(map((data) => data as MobileBlackList_ApiResponse));
  }

  /**
   *
   * @param blMobiledata consists of blacklist mobile route data
   * @description adds the mobile blacklist route data
   */
  addBlackListMobile(body, formType: boolean): Observable<MobileBlackList_AddResponse> {
    let values: any;
    if(formType){
      values = body

    }else {
      values ={...this.user, ...body}
    }
    return this.http
      .post(this.baseUrl + 'mobile/add', values )
      .pipe(map((data) => (data as unknown) as MobileBlackList_AddResponse));
  }

  /**
   *
   * @param blMobiledata consists of blacklist mobile data to delete
   * @description deletes the record
   */
  deleteBlackListMobile(
    blMobiledata
  ): Observable<MobileBlackList_DeleteResponse> {
    return this.http
      .post(this.baseUrl + 'mobile/delete', {...blMobiledata, ...this.user})
      .pipe(map((data) => (data as unknown) as MobileBlackList_DeleteResponse));
  }


}
