import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/commonModels';
import { Countries } from '../../../models/BillManagement/Slab/slab.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SlabRouteService {

  baseUrl: string = environment.serverUrl + '/routemgmt/';
  httpOptions = { headers: new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }) };

  public previewList: Countries[] = []; // common preview list data

  formArray(fb: FormGroup, fc: string): FormArray {
    return fb.get(fc) as FormArray;
  }

  constructor() { }
}
