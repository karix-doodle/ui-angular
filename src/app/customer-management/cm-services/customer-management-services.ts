import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { APIResponse } from "../models/customer-management.model";

@Injectable({
    providedIn: 'root'
  })
export class CustomerManagementService{
    apiURL:string = environment.serverUrl;
    custMgmtContext:string ='/customermgmt';
    baseURL:string = `${this.apiURL}${this.custMgmtContext}`;
    
    
    httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };

    loggedinUserInfo = {
        loggedinusername: environment.loggedinusername,
        loggedinempid: environment.loggedinempid
        //loggedinempid: 1137
    };

    constructor(private httpClient: HttpClient) {}


    getExistingUsersList():Observable<APIResponse>{
        let finalURL=`${this.baseURL}/listsexistingesme?loggedinusername=${this.loggedinUserInfo.loggedinusername}&loggedinempid=${this.loggedinUserInfo.loggedinempid}`;
        return this.httpClient.get(
            finalURL,this.httpOptions)
        .pipe(
                map((apiResponse:APIResponse)=>{
                    return apiResponse;
                }),
                catchError( error => {
                    return this.handleError(error);            
                })
            )
        }
    


    handleError(error:any){
        return throwError(error.message);
    }




}