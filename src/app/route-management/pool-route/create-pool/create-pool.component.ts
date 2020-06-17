import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/commonModels';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  CountriesListData, OperatorsListData, GatewaysListData, GatewaysListBody,
  GatewaysListRes
} from '../../models/RouteManagement/Generic/generic';
import { NewRoutesList, CloneAPoolRouteData, CloneAPoolRouteRes } from '../../models/RouteManagement/PoolRoute/poolRoute';
import { Subscription } from 'rxjs';
import { GenericService } from '../../services/RouteManagement/Generic/generic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { startWith, pairwise } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { errorAlert, successAlert, confirmAlert } from '../../../shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.css']
})
export class CreatePoolComponent implements OnInit, OnDestroy {
  @ViewChild('tableRow', { static: false }) tableRow: ElementRef;
  user: User;
  submitted: boolean;
  formOfCreateClone: FormGroup;
  countriesList: CountriesListData[];
  operatorsList: OperatorsListData[];
  gatewaysList: GatewaysListData[];
  gatewaysListBody: GatewaysListBody = new GatewaysListBody();
  previewList: NewRoutesList[] = [];
  continentsCount: number;
  countryCount: number;
  searchText: any;
  clonedRouteData: CloneAPoolRouteData;
  countryc: CountriesListData;
  isClone: boolean;
  previousGatewayType: string;
  sub: Subscription;
  sortingName: string;
  isDesc: boolean;
  routeNameMin: number;
  routeNameMax: number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private genericService: GenericService,
    private poolRouteService: PoolRouteService
  ) {
    this.createForm();
    this.routeNameMin = environment.createClonePoolRouteFieldLength.routeNameInputBox.min;
    this.routeNameMax = environment.createClonePoolRouteFieldLength.routeNameInputBox.max;
  }

  ngOnInit() {

    this.submitted = false;
    // clone a pool route
    this.poolRouteService.changeSubjectData(null); // for initial subject data reset
    /**
     * @description gets route id form route params.
     */
    this.route.params
      .subscribe(
        (params: Params) => {
          const routeId = +params.id;
          if (routeId) {
            this.isClone = true;
            this.setParamData(routeId);
          } else {
            this.poolRouteService.previewList = [];
          }
        }
      );
    // clone a pool route
    this.gatewaysListBody.loggedinempid = environment.loggedinempid;
    this.gatewaysListBody.loggedinusername = environment.loggedinusername;
  }
  /**
   * @description create and define a parent(1st step) form.
   */
  private createForm() {
    this.formOfCreateClone = this.formBuilder.group({
      route_name: ['', Validators.required],
      gw_type: ['', [Validators.required]],
      fallback_gw_type: [''],
      firstCtrl: [''],
      countryName: ['', Validators.required],
      operatorMNC: ['', Validators.required],
      gatewayRatio: this.formBuilder.array([this.createItem()]),
    });

    this.sub = this.formOfCreateClone.get('gw_type')
      .valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        this.previousGatewayType = prev;
      });
  }
  /**
   * @description create and define gatewayRatio form array.
   */
  createItem(): FormGroup {
    return this.formBuilder.group({
      gw_id: ['', [Validators.required]],
      ratio_in_percentage: [10, [Validators.required]]
    });
  }
  /**
   * @description gets the parent form array data.
   */
  get parentFormArray(): FormArray {
    return this.formOfCreateClone.get('gatewayRatio') as FormArray;
  }
  /**
   * @param routeId consists of route id.
   * @description gets the clone route data.
   */
  setParamData(routeId) {
    this.poolRouteService.cloneAPoolRoute({ route_id: routeId, loggedinempid: environment.loggedinempid })
      .subscribe(
        (res: CloneAPoolRouteRes) => {
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            this.clonedRouteData = res.data;
            this.formOfCreateClone.patchValue({
              firstCtrl: '',
              route_name: res.data.route_name,
              gw_type: res.data.gw_type,
              fallback_gw_type: res.data.fallback_route
            });
            this.prePopulateForm(res.data.routes_list[0]);
            this.poolRouteService.previewList = [];
            this.poolRouteService.previewList = res.data.routes_list.slice(1);
            this.loadGatewaysList('cloneRouteParams');
            this.previewListData();
          } else if (
            res.responsestatus === environment.APIStatus.error.text &&
            res.responsecode < environment.APIStatus.error.code
          ) {
            errorAlert(res.message, res.responsestatus);
          }
        }, (error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
  }
  /**
   * @param data consists of route id.
   * @description to prepopulate the 1st step form data.
   */
  private prePopulateForm(data: NewRoutesList) {
    this.formOfCreateClone.patchValue({
      countryName: data.country,
      operatorMNC: data.mnc
    });
    this.parentFormArray.clear();
    const formArray = this.parentFormArray;
    data.ratios.forEach(element => {
      formArray.push(
        this.formBuilder.group({
          gw_id: [element.gw_id, [Validators.required]],
          ratio_in_percentage: [element.ratio_in_percentage, [Validators.required]]
        })
      );
    });
  }
  /**
   * @param from consists of origin method identification string.
   * @description to check and initiate load Gateways list method.
   */
  loadGatewaysList(from) {
    if (from === 'cloneRouteParams') {
      this.loadList();
    } else if (from === 'onChange') {
      if (!this.poolRouteService.previewList.length) {
        this.resetFirstFormArray();
        this.loadList();
      } else if (this.poolRouteService.previewList.length) {
        confirmAlert('You won\'t be able to revert added route!', 'Yes, reset it!')
          .then((result) => {
            if (result.isConfirmed) {
              this.poolRouteService.previewList = [];
              this.clonedRouteData = undefined;
              this.resetFirstFormArray();
              this.loadList();
              this.poolRouteService.changeSubjectData(2);
            } else {
              this.formOfCreateClone.patchValue({
                gw_type: this.previousGatewayType
              });
            }
          });
      }
    }
  }
  /**
   * @description gets the gateways list date.
   */
  loadList() {
    this.formOfCreateClone.patchValue({
      fallback_gw_type: `lcr-${this.formOfCreateClone.value.gw_type}`
    });
    this.gatewaysListBody.gw_type = this.formOfCreateClone.value.gw_type;
    this.genericService.getGatewaysList(this.gatewaysListBody).subscribe(
      (res: GatewaysListRes) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          this.gatewaysList = res.data;
          this.poolRouteService.changeSubjectData(4);
        } else if (
          res.responsestatus === environment.APIStatus.error.text &&
          res.responsecode < environment.APIStatus.error.code
        ) {
          errorAlert(res.message, res.responsestatus);
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
  /**
   * @description to reset the 1st form array.
   */
  resetFirstFormArray() {
    this.formOfCreateClone.get('gatewayRatio').markAsUntouched();
    const formArray = this.parentFormArray;
    formArray.controls.forEach(ratio => ratio.patchValue(
      {
        gw_id: '',
        ratio_in_percentage: 10
      }
    ));
  }
  /**
   * @description to set the parent form is submitted.
   */
  submitState() {
    this.submitted = true;
  }
  /**
   * @param eventData consists of add new button click method identification string
   * @description to set the parent form is submitted.
   */
  previewListData(eventData?: string) {
    this.continentsCount = this.poolRouteService.count('continent');
    this.countryCount = this.poolRouteService.count('country');
    if (eventData === 'fromAddNew') {
      this.onScrollDown();
    }
  }
  /**
   * @param route consists of selected route detail object.
   * @description to pass the preview list edit event from parent to child component.
   */
  onEditPreview(route: NewRoutesList) {
    this.prePopulateForm(route);
    this.poolRouteService.changeSubjectData(1);
    // does tell about current edit event to child.
    this.poolRouteService.previewList = this.poolRouteService.previewList.filter((element) => element !== route);
    this.previewListData();

  }
  /**
   * @param route consists of selected route detail object.
   * @description to pass the preview delete edit event from parent to child component.
   */
  onDeleteRoute(route: NewRoutesList) {
    confirmAlert().then((result) => {
      if (result.isConfirmed) {
        // this.gatewaysList.forEach(element => {
        //   route.ratios.forEach(ratios => {
        //     if (ratios.gw_id === element.gw_id) {
        //       element.isSelected = false;
        //     }
        //   });
        // });
        this.poolRouteService.previewList = this.poolRouteService.previewList.filter((element) => element !== route);
        this.previewListData();
        this.poolRouteService.changeSubjectData(3);
        // does tell about preview delete event to child.
      }
    });
  }
  /**
   * @description page scroll down.
   */
  onScrollDown(): void {
    setTimeout(() => {
      this.tableRow.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }
  /**
   * @description to clear all observable subscriptions.
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }

}

