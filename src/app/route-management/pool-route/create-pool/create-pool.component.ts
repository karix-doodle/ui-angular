import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { startWith, pairwise } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { HttpErrorResponse } from '@angular/common/http';
import { errorAlert, confirmAlert } from '../../../shared/sweet-alert/sweet-alert';
import { GatewaysListRes, GatewaysListBody, GatewaysListData } from '../../models/RouteManagement/Generic/generic';
import { GenericService } from '../../services/RouteManagement/Generic/generic.service';
import { NewRoutesList, NewRowRoutesList, CloneAPoolRouteRes, CloneAPoolRouteData } from '../../models/RouteManagement/PoolRoute/poolRoute';
import { Params, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../../../service/auth/authorization.service';

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.css']
})
export class CreatePoolComponent implements OnInit, OnDestroy {
  @ViewChild('tableRow', { static: false }) tableRow: ElementRef;
  parentFormGroup: FormGroup;
  sub: Subscription;
  previousGatewayType: string;
  routeNameMin: number;
  routeNameMax: number;
  gatewaysListBody: GatewaysListBody = new GatewaysListBody();
  // gatewaysList: GatewaysListData[];
  gatewaysList: Subject<GatewaysListData[]> = new Subject<GatewaysListData[]>();
  submitted: boolean;
  previewList: NewRoutesList[];
  continentsCount: number;
  countryCount: number;
  editModeStatus: boolean;
  previewEditClick: Subject<[boolean, number, string, NewRowRoutesList[]]> = new Subject<[boolean, number, string, NewRowRoutesList[]]>();
  clonedRouteData: CloneAPoolRouteData;
  clonedData: Subject<CloneAPoolRouteData> = new Subject<CloneAPoolRouteData>();
  childDataReset: Subject<number> = new Subject<number>();
  previewDeleteClick: Subject<void> = new Subject<void>();
  searchText: any;
  constructor(
    private formBuilder: FormBuilder,
    public poolRouteService: PoolRouteService,
    private genericService: GenericService,
    private route: ActivatedRoute,
    public authService: AuthorizationService
  ) {
    this.createForm();
    this.routeNameMin = environment.createClonePoolRouteFieldLength.routeNameInputBox.min;
    this.routeNameMax = environment.createClonePoolRouteFieldLength.routeNameInputBox.max;
  }

  ngOnInit() {
    this.submitted = false;
    this.previewList = [];
    this.poolRouteService.previewList = [];
    this.editModeStatus = false;
    this.searchText = '';
    this.initCloneAPoolRouteParams(); // clone a pool route
  }
  initCloneAPoolRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const routeId = +params.id;
          if (routeId) {
            // this.isClone = true;
            this.getRouteCloneDate(routeId);
          } else {
            this.poolRouteService.previewList = [];
          }
        }
      );
  }
  getRouteCloneDate(routeId) {
    this.poolRouteService.cloneAPoolRoute({ route_id: routeId, loggedinempid: environment.loggedinempid })
      .subscribe(
        (res: CloneAPoolRouteRes) => {
          if (
            res.responsestatus === environment.APIStatus.success.text &&
            res.responsecode > environment.APIStatus.success.code
          ) {
            this.clonedRouteData = res.data;
            // console.log(res.data);
            this.parentFormGroup.patchValue({
              gw_type: res.data.gw_type,
              fallback_gw_type: res.data.fallback_route
            });
            this.poolRouteService.previewList = [];
            this.poolRouteService.previewList = res.data.routes_list;
            this.loadGatewaysList('cloneRouteParams');
            this.previewListSetCount();
            this.clonedData.next(this.clonedRouteData);
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
   * @description create and define a parent(1st step) form.
   */
  private createForm() {
    this.parentFormGroup = this.formBuilder.group({
      route_name: ['', Validators.required],
      gw_type: ['', [Validators.required]],
      fallback_gw_type: [''],
      firstCtrl: [''],
      continent: [''],
      country: ['', Validators.required],
      mcc: [''],
      operator: ['', Validators.required],
      mnc: [''],
      ratios: this.formBuilder.array([this.poolRouteService.createItem()]),
    });

    this.sub = this.parentFormGroup.get('gw_type')
      .valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [any, any]) => {
        this.previousGatewayType = prev;
      });
  }
  /**
   * @description create and define gatewayRatio form array.
   */
  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     gw_id: ['', [Validators.required]],
  //     ratio_in_percentage: [10, [Validators.required]]
  //   });
  // }
  /**
   * @description gets the parent form array data.
   */
  get parentFormGroupFormArray(): FormArray {
    // return this.parentFormGroup.get('gatewayRatio') as FormArray;
    return this.poolRouteService.formArray(this.parentFormGroup, 'ratios');
  }

  loadGatewaysList(from) {
    if (from === 'cloneRouteParams') {
      this.loadList();
    } else if (from === 'onChange') {
      if (!this.poolRouteService.previewList.length) {
        if (this.parentFormGroup.get('country').dirty ||
          this.parentFormGroup.get('operator').dirty ||
          this.parentFormGroupFormArray.dirty) {
          confirmAlert('Your unsaved data will get erased', 'Yes, delete it!')
            .then((result) => {
              if (result.isConfirmed) {
                // this.parentFormGroupReset();
                this.childDataReset.next(1);
                this.loadList();

              } else {
                this.parentFormGroup.patchValue({
                  gw_type: this.previousGatewayType
                });
              }
            });
        } else {
          this.loadList();
        }
      } else if (this.poolRouteService.previewList.length) {
        confirmAlert('You won\'t be able to revert added route!', 'Yes, reset it!')
          .then((result) => {
            if (result.isConfirmed) {
              this.poolRouteService.previewList = [];
              // this.clonedRouteData = undefined;
              // this.parentFormGroupReset();
              this.childDataReset.next(2);
              this.loadList();
              // this.poolRouteService.changeSubjectData(2);

            } else {
              this.parentFormGroup.patchValue({
                gw_type: this.previousGatewayType
              });
            }
          });
      }
    }
  }
  loadList() {
    this.parentFormGroup.patchValue({
      fallback_gw_type: `lcr-${this.parentFormGroup.value.gw_type}`
    });
    this.gatewaysListBody.loggedinempid = environment.loggedinempid;
    this.gatewaysListBody.loggedinusername = environment.loggedinusername;
    this.gatewaysListBody.gw_type = this.parentFormGroup.value.gw_type;
    this.genericService.getGatewaysList(this.gatewaysListBody).subscribe(
      (res: GatewaysListRes) => {
        if (
          res.responsestatus === environment.APIStatus.success.text &&
          res.responsecode > environment.APIStatus.success.code
        ) {
          const gatewaysList: GatewaysListData[] = res.data;
          // this.poolRouteService.changeSubjectData(4);
          this.gatewaysList.next(gatewaysList);
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
  // parentFormGroupReset() {
  //   const form = this.parentFormGroup;
  //   this.parentFormGroup.reset({
  //     route_name: form.value.route_name,
  //     gw_type: form.value.gw_type,
  //     fallback_gw_type: form.value.fallback_gw_type,
  //     firstCtrl: '',
  //     continent: '',
  //     country: '',
  //     mcc: '',
  //     operator: '',
  //     mnc: ''
  //   });
  //   const firstFormArray = this.parentFormGroupFormArray;
  //   firstFormArray.clear();
  //   firstFormArray.push(this.poolRouteService.createItem());
  // }

  submitState() {
    this.submitted = true;
  }
  listenAddedNewRouteChildEvent() {
    this.submitted = false;
    this.editModeStatus = false;
    this.previewList = this.poolRouteService.previewList;
    this.onScrollDown();
    this.previewListSetCount();
  }
  previewListSetCount(eventData?: string) {
    this.continentsCount = this.poolRouteService.count('continent');
    this.countryCount = this.poolRouteService.count('country');
    // if (eventData === 'fromAddNew') {
    //   this.onScrollDown();
    // }
  }
  onEditPreview(routeData: NewRoutesList, listIndex) {
    this.editModeStatus = true;
    this.previewEditClick.next([true, listIndex, routeData.country, routeData.ratios]);
    this.parentFormGroup.patchValue({
      continent: routeData.continent,
      country: routeData.country,
      mcc: routeData.mcc,
      operator: routeData.operator,
      mnc: routeData.mnc
    });
    const firstFormArray = this.parentFormGroupFormArray;
    firstFormArray.clear();
    routeData.ratios.forEach(element => {
      firstFormArray.push(
        this.formBuilder.group({
          gw_id: element.gw_id,
          ratio_in_percentage: element.ratio_in_percentage
        })
      );
    });
    // console.log(routeData.ratios);
  }
  onDeleteRoute(listIndex) {
    if (!this.editModeStatus) {
      confirmAlert().then((result) => {
        if (result.isConfirmed) {
          this.poolRouteService.previewList.splice(listIndex, 1);
          this.previewListSetCount();
          this.previewDeleteClick.next();
        }
      });
    } else {
      errorAlert('You are in edit mode', 'Warning');
    }
  }
  onScrollDown(): void {
    setTimeout(() => {
      this.tableRow.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }
  /**
   * @description to clear all observable subscriptions.
   */
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}

