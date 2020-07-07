import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class DashboardService{

    apiUrl:string =  `${environment.serverUrl}/test`;
    httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) };

    constructor(private httpClient: HttpClient) {}

    getTesttokens():Observable<any>{
        return this.httpClient.get(
            this.apiUrl,this.httpOptions)
        .pipe(
                map((apiResponse:any)=>{
                    return apiResponse;
                }),
                catchError( error => {
                    console.log(`error:${JSON.stringify(error)}`);
                    return this.handleError(error);            
                })
            )
        }

        handleError(error:any){
            return throwError(error.message);
        }

}