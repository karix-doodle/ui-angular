import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PendingUsers_ApiResponse } from '../models/customer-management.model';

@Injectable({
    providedIn: 'root'
  })
export class CustomerManagementService {
    
    baseUrl: string = environment.serverUrl + '/customermgmt';
    baseUrlFile: string = environment.FileUploadUrl + '/gateway';
    httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };
    httpOptions_file = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), responseType: 'blob' as 'json' };
    httpOptions_formdata = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;' }) };

    user = {
        loggedinusername: environment.loggedinusername,
        //loggedinempid: environment.loggedinempid
        loggedinempid: 9110
    };

    constructor(private http: HttpClient) { }
    
      /**
       * @description List of users pending for activation
      */
      getUsersPendingForActivation(): Observable<PendingUsers_ApiResponse> {
        return this.http.get(this.baseUrl + '/listspendingesme?loggedinusername=' + this.user.loggedinusername + '&loggedinempid=' + this.user.loggedinempid, this.httpOptions)
          .pipe(map(m => m as PendingUsers_ApiResponse));
      }

      //http://10.20.51.182:8484/api/intlmgmt/customermgmt/listspendingesme?loggedinusername=sdfas&loggedinempid=9110

}