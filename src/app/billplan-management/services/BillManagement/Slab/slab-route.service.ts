import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/commonModels';
import { Countries, SlabCreateRateCardRes, SlabCreateRateCardBody } from '../../../models/BillManagement/Slab/slab.model';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SlabRouteService {

  baseUrl: string = environment.serverUrl + '/billplanmgmt/';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  public previewList: Countries[] = []; // common preview list data

  formArray(fb: FormGroup, fc: string): FormArray {
    return fb.get(fc) as FormArray;
  }

  constructor(public http: HttpClient) { }

  createSlabRateCard(input: SlabCreateRateCardBody): Observable<SlabCreateRateCardRes> {
    return this.http.post(`${this.baseUrl}createratecard/slab`, input, this.httpOptions)
      .pipe(map(m => m as SlabCreateRateCardRes));
  }
  /**
   * @param params consists of preview list element value.
   * @description gets the unique elements count.
   */
  count(params) {
    const uniqueId = new Set();
    this.previewList.forEach(element => {
      uniqueId.add(element[params]);
    });
    return uniqueId.size;
  }
}
