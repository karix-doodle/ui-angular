import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SenderCustomApiResponse, MobileCustomSenderIdResponse } from '../../../models/custom.model';

@Injectable({
  providedIn: 'root'
})
export class SenderCustomService {
  constructor(public http: HttpClient) { }

  baseUrl: string = environment.serverUrl + '/routemgmt/custom/senderidtemplate';
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  user = {
    loggedinusername: environment.loggedinusername,
    loggedinempid: environment.loggedinempid,
  };

  /**
   *
   * @description gets all the senderid custom route datas
   */
  getCustomSenderidList(): Observable<SenderCustomApiResponse> {
    return this.http
      .post(this.baseUrl + '/list', this.user)
      .pipe(map((data) => data as SenderCustomApiResponse));
  }

  /**
   *
   * @param body consists of sender custom route data
   * @description adds the senderid custom route data
   */
  addCustomSenderTemplate(body, formType: boolean): Observable<MobileCustomSenderIdResponse> {
    let customSenderIdTemplateData: any;

    switch (formType) {
      case true: {
        customSenderIdTemplateData = body;
        break;
      }
      case false: {
        customSenderIdTemplateData = { ...this.user, ...body };
        break;
      }
    }
    return this.http
      .post(this.baseUrl + '/add', customSenderIdTemplateData)
      .pipe(map((data) => data as MobileCustomSenderIdResponse));
  }

  /**
   *
   * @param body consists of custom senderid data to delete
   * @description deletes the record
   */
  deleteCustomSenderTemplate(body): Observable<MobileCustomSenderIdResponse> {
    return this.http
      .post(this.baseUrl + '/delete', { ...this.user, ...body }, this.httpOptions)
      .pipe(map((data) => data as MobileCustomSenderIdResponse));
  }
}
