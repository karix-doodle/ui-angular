import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { SlabRouteService } from '../../../services/BillManagement/Slab/slab-route.service';
import { Countries } from '../../../models/BillManagement/Slab/slab.model';
import { Subject } from 'rxjs';
import { errorAlert } from '../../../../shared/sweet-alert/sweet-alert';

@Component({
  selector: 'app-create-ratecard',
  templateUrl: './create-ratecard.component.html',
  styleUrls: ['./create-ratecard.component.css']
})
export class CreateRatecardComponent implements OnInit {

  SlabFormGroup: FormGroup;
  previewList: Countries[] = [];
  editMode: Subject<[boolean, number, string]> = new Subject<[boolean, number, string]>();
  editModeStatus: boolean;
  countryCount: number;
  operatorCount: number;
  constructor(
    private formBuilder: FormBuilder,
    private slabRouteService: SlabRouteService
  ) {
    this.createSlabForm();
  }

  ngOnInit() {
    this.slabRouteService.previewList = [];
    this.editModeStatus = false;
  }

  private createSlabForm() {
    this.SlabFormGroup = this.formBuilder.group({
      loggedinusername: [environment.loggedinusername],
      loggedinempid: [environment.loggedinempid],
      billplan_id: ['2'],
      billplan_currencyid: ['13'],
      ratecard_type: ['slab'],
      ratecard_name: ['slabTest7'],
      continent_name: [''],
      country_name: ['', [Validators.required]],
      operator_name: ['', [Validators.required]],
      mcc: [''],
      mnc: [''],
      slabs: this.formBuilder.array([this.createSlabsItem()])
    });
  }

  createSlabsItem(): FormGroup {
    return this.formBuilder.group({
      min: [1],
      max: [999999999, [Validators.required, Validators.min(2), Validators.max(999999999)]],
      billing_rate: ['', [Validators.required]],
      normalize_rate: ['']
    });
  }
  get firstFormArray(): FormArray {
    return this.slabRouteService.formArray(this.SlabFormGroup, 'slabs');
  }
  listenAddNew(list) {
    // console.log(list);
    this.editModeStatus = false;
    this.previewList = this.slabRouteService.previewList;
    this.countryCount = this.slabRouteService.count('country_name');
    this.operatorCount = this.slabRouteService.count('operator_name');
  }
  editPreviewSlabs(listIndex, countryName) {
    console.log(listIndex);
    this.editModeStatus = true;
    this.editMode.next([true, listIndex, countryName]);
    this.SlabFormGroup.patchValue({
      continent_name: this.slabRouteService.previewList[listIndex].continent_name,
      country_name: this.slabRouteService.previewList[listIndex].country_name,
      operator_name: this.slabRouteService.previewList[listIndex].operator_name,
      mcc: this.slabRouteService.previewList[listIndex].mcc,
      mnc: this.slabRouteService.previewList[listIndex].mnc,
      slabs: this.slabRouteService.previewList[listIndex].slabs
    });
    // console.log();
    const slabs = this.firstFormArray;
    slabs.clear();
    this.slabRouteService.previewList[listIndex].slabs.forEach(slab => {
      slabs.push(
        this.formBuilder.group({
          min: slab.min,
          max: slab.max,
          billing_rate: slab.billing_rate,
          normalize_rate: slab.normalize_rate
        })
      );
    });
  }
  deletePreviewSlabs(listIndex) {
    console.log(listIndex);
    if (!this.editModeStatus) {
      this.slabRouteService.previewList.splice(listIndex, 1);
    } else {
      errorAlert('You are in edit mode', 'Warning');
    }
  }
}
