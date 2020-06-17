import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from '../../services/RouteManagement/Generic/generic.service';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { MatStepper } from '@angular/material';
import { User } from 'src/app/shared/models/commonModels';
import {
   CountriesListData, OperatorsListData, GatewaysListData, CountriesListRes,
   OperatorsListRes
} from '../../models/RouteManagement/Generic/generic';
import {
   NewRoutesList, CreateAPoolRouteBody, CloneAPoolRouteData, PoolRouteRes
} from '../../models/RouteManagement/PoolRoute/poolRoute';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { errorAlert, successAlert } from '../../../shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';
import { element } from 'protractor';
import { startWith, pairwise, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
   selector: 'app-route-stepper-form',
   templateUrl: './route-stepper-form.component.html',
   styleUrls: ['./route-stepper-form.component.css']
})
export class RouteStepperFormComponent implements OnInit, OnDestroy {
   @ViewChild('stepper', { static: false }) stepper: MatStepper;
   isLinear = true;
   user: User;
   // firstFormGroup: FormGroup;
   secondFormGroup: FormGroup;
   gatewayRatio: FormArray;
   row_routes_list: FormArray;
   // total: number;
   ratio: number;
   submitted: boolean;
   secondStepSubmitted: boolean;
   countriesList: CountriesListData[];
   operatorsList: OperatorsListData[];
   newRoutesList: NewRoutesList[] = [];
   newRoute: NewRoutesList = new NewRoutesList();
   createAPoolRouteBody: CreateAPoolRouteBody = new CreateAPoolRouteBody();
   formArrayIndex: number;
   routeEditMode: boolean;
   selectedCountry: CountriesListData[];
   selectedOperator: OperatorsListData[];
   defineRowGatewaysList: GatewaysListData[];
   customRowGateway: GatewaysListData[] = [];
   @Input() parentForm: FormGroup;
   @Input() gatewaysList: GatewaysListData[];
   @Input() clonedData: CloneAPoolRouteData;
   @Input() isClone: boolean;
   @Output() isSubmitted = new EventEmitter();
   @Output() routesList = new EventEmitter();
   // @ViewChild('stepper') stepper: MatStepper;
   sub: Subscription;
   // currentYOffSet: number;
   // selectedMNC: number;
   commentsTextAreaMin: number;
   commentsTextAreaMax: number;
   continentsCount: number;
   countryCount: number;
   routeAlreadExist: boolean;
   constructor(
      private formBuilder: FormBuilder,
      config: NgbModalConfig,
      private modalService: NgbModal,
      private genericService: GenericService,
      private poolRouteService: PoolRouteService,
      private router: Router,
      private el: ElementRef
   ) {
      this.commentsTextAreaMin = environment.createClonePoolRouteFieldLength.commentsTextArea.min;
      this.commentsTextAreaMax = environment.createClonePoolRouteFieldLength.commentsTextArea.max;
      this.createSecondForm();
   }

   openPreviewModel(content) {
      this.continentsCount = this.poolRouteService.count('continent');
      this.countryCount = this.poolRouteService.count('country');
      if (this.poolRouteService.previewList.length) {
         this.modalService.open(content,
            { windowClass: 'gt-preview-modal' }
         );
      }
   }

   ngOnInit() {
      this.routeEditMode = false;
      /**
       * @description parentToChildDetectionBehaviorSubject subscriptions.
       */
      this.sub = this.poolRouteService.currentSubjectData.subscribe((data) => {
         if (data === 1) {  // preview list edit
            this.routeEditMode = true;
            this.selectCountry();
            if (this.poolRouteService.previewList.length > 1) {
               this.onScrollTop();
            }
            if (this.stepper.selectedIndex === 1) {
               this.stepper.previous();
            }
            this.gatewaysList.forEach(isPrePopulatedGateway => {
               isPrePopulatedGateway.isSelected = false;
            });
            this.gatewaysList.forEach(isPrePopulatedGateway => {
               this.parentFormArray.value.forEach(obj => {
                  if (obj.gw_id === isPrePopulatedGateway.gw_id) {
                     isPrePopulatedGateway.isSelected = true;
                  }
               });
            });
         } else if (data === 2) { // gateway type drop down reset confirm
            // this.createSecondForm();
            // this.secondFormGroup.reset();
            this.secondFormReset();
            if (this.stepper.selectedIndex === 1) {
               this.stepper.previous();
            }
            this.gatewaysList.forEach(isPrePopulatedGateway => {
               isPrePopulatedGateway.isSelected = false;
            });
            this.defineRowGatewaysList = JSON.parse(JSON.stringify(this.gatewaysList));
            this.filterCustomRowGatewayList();
            // console.log('confirm', this.defineRowGatewaysList);
         } else if (data === 3) { // preview list delete
            if (!this.poolRouteService.previewList.length) {
               if (this.stepper.selectedIndex === 1) {
                  this.stepper.previous();
               }
               this.defineRowGatewaysList.forEach(gtElement => {
                  gtElement.isSelected = false;
               });
               // console.log('second form gateway list when delete', this.defineRowGatewaysList);
               this.filterCustomRowGatewayList();
               this.secondFormReset();
            } else if (this.poolRouteService.previewList.length) {
               // console.log(this.poolRouteService.previewList);
               this.defineRowGatewaysList.forEach(gtElement => {
                  gtElement.isSelected = false;
               });
               this.defineRowGatewaysList.forEach(gtElement => {
                  this.poolRouteService.previewList.forEach(selectedRoute => {
                     selectedRoute.ratios.forEach(element => {
                        if (element.gw_id === gtElement.gw_id) {
                           gtElement.isSelected = true;
                        }
                     });
                  });
               });
               this.filterCustomRowGatewayList();
            }
         } else if (data === 4) { // gateway type dropdown selected based on clone response or manual
            setTimeout(() => {
               // console.log(this.isClone);
               if (this.isClone) {
                  // console.log(this.clonedData.routes_list);
                  this.gatewaysList.forEach(gateway => {
                     this.clonedData.routes_list[0].ratios.forEach(element => {
                        if (element.gw_id === gateway.gw_id) {
                           gateway.isSelected = true;
                        }
                     });
                  });
                  this.defineRowGatewaysList = JSON.parse(JSON.stringify(this.gatewaysList));
                  // console.log('second form gateway list when delete', this.defineRowGatewaysList);
                  // console.log(this.clonedData.routes_list.length,
                  //    this.clonedData.routes_list.slice(1));
                  // console.log(this.clonedData.routes_list);
                  if (this.clonedData.routes_list.length > 1) {
                     this.defineRowGatewaysList.forEach(secondFormGate => {
                        this.clonedData.routes_list.slice(1).forEach(elementRt => {
                           elementRt.ratios.forEach(ratio => {
                              if (ratio.gw_id === secondFormGate.gw_id) {
                                 secondFormGate.isSelected = true;
                              }
                           });
                        });
                     });
                  }
               } else if (!this.isClone) {
                  this.defineRowGatewaysList = JSON.parse(JSON.stringify(this.gatewaysList));
               }
               // console.log('1st form gateway list', this.gatewaysList);
               // console.log('second form gateway list when delete', this.defineRowGatewaysList);

            }, 200);
         }
      });
      this.submitted = false;
      this.secondStepSubmitted = false;

      this.loadCountriesList();

      this.sub = this.parentForm.get('gatewayRatio')
         .valueChanges
         .pipe(debounceTime(100), startWith(null), pairwise())
         .subscribe(([prev, next]: [any, any]) => {
            // console.log(this.formArrayIndex);
            // console.log(prev);
            // console.log(next);
            if (this.formArrayIndex !== undefined) {
               // console.log(prev[this.formArrayIndex]);
               // console.log(next[this.formArrayIndex]);
               if (prev[this.formArrayIndex].gw_id !== next[this.formArrayIndex].gw_id) {
                  this.gatewaysList.forEach(element => {
                     if (element.gw_id === next[this.formArrayIndex].gw_id) {
                        element.isSelected = true;
                     }
                     if (element.gw_id === prev[this.formArrayIndex].gw_id) {
                        element.isSelected = false;
                     }
                  });
               }
            }
         });

      this.sub = this.secondFormGroup.get('row_routes_list')
         .valueChanges
         .pipe(debounceTime(100), startWith(null), pairwise())
         .subscribe(([prev, next]: [any, any]) => {
            // console.log(this.formArrayIndex);
            // console.log(prev);
            // console.log(next);
            if (this.formArrayIndex !== undefined) {
               // console.log(prev[this.formArrayIndex]);
               // // const previous = prev !== null ?
               // console.log(next[this.formArrayIndex]);
               if (prev === null) {
                  this.defineRowGatewaysList.forEach(element => {
                     if (element.gw_id === next[this.formArrayIndex].gw_id) {
                        element.isSelected = true;
                     }
                  });
               } else if (prev[this.formArrayIndex].gw_id !== next[this.formArrayIndex].gw_id) {
                  console.log(this.defineRowGatewaysList);
                  this.defineRowGatewaysList.forEach(element => {
                     if (element.gw_id === next[this.formArrayIndex].gw_id) {
                        element.isSelected = true;
                     }
                     if (element.gw_id === prev[this.formArrayIndex].gw_id) {
                        element.isSelected = false;
                     }
                  });
               }
            }
         });
   }
   /**
    * @description to page scroll top.
    */
   private onScrollTop() {
      const scrollToTop = window.setInterval(() => {
         const posTop = window.pageYOffset;
         if (posTop > 0) {
            window.scrollTo(0, posTop - 10); // how far to scroll on each step
         } else {
            window.clearInterval(scrollToTop);
         }
      }, 16);
   }
   /**
    * @description create and define a 2nd step form.
    */
   private createSecondForm() {
      this.secondFormGroup = this.formBuilder.group({
         secondCtrl: [''],
         row_route: ['block', [Validators.required]],
         row_routes_list: this.formBuilder.array([this.createItem()]),
         loggedinempid: environment.loggedinempid,
         comments: ['', [Validators.required]]
      });
   }
   /**
    * @description create and define row_routes_list form array.
    */
   createItem(): FormGroup {
      return this.formBuilder.group({
         gw_id: ['', [Validators.required]],
         ratio_in_percentage: [10, [Validators.required]]
      });
   }
   /**
    * @description reset the second form.
    */
   secondFormReset() {
      this.secondFormGroup.patchValue({
         secondCtrl: '',
         row_route: 'block',
         loggedinempid: environment.loggedinempid,
         comments: ''
      });
      this.rowRoutesListFormArray.clear();
      const formArray = this.rowRoutesListFormArray;
      formArray.controls.forEach(ratio => ratio.patchValue(
         {
            gw_id: '',
            ratio_in_percentage: 10
         }
      ));
   }
   /**
    * @description gets the countries list.
    */
   loadCountriesList() {
      this.genericService.getCountriesList().subscribe(
         (res: CountriesListRes) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.countriesList = res.data;
               // console.log(this.isClone);
               // console.log(this.gatewaysList);
               setTimeout(() => {
                  if (this.isClone) {
                     this.selectCountry();
                  }
               }, 800);
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
    * @description gets the country_code from selected country.
    */
   selectCountry() {
      this.selectedCountry = [];
      this.selectedCountry = this.countriesList.filter((element) => element.country === this.parentForm.value.countryName);
      setTimeout(() => {
         this.loadOperatorsList(this.selectedCountry[0].country_code);
      }, 200);
      // console.log(this.selectedCountry);
      // console.log(this.selectedCountry[0].country_code);
   }
   /**
    * @param countryCode consists of country Code.
    * @description gets the operators list.
    */
   loadOperatorsList(countryCode: number) {
      this.genericService.getOperatorsList({ country_code: countryCode }).subscribe(
         (res: OperatorsListRes) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.operatorsList = res.data;
               if (this.isClone) {
                  this.isClone = false;
                  this.selectOperator();
               } else if (this.routeEditMode) {
                  this.routeEditMode = false;
                  this.selectOperator();
               } else {
                  this.parentForm.patchValue({
                     operatorMNC: this.operatorsList[0].mnc
                  });
                  this.selectOperator();
               }
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
    * @description gets the selected operator object.
    */
   selectOperator() {
      this.selectedOperator = this.operatorsList.filter((element: OperatorsListData) => element.mnc === this.parentForm.value.operatorMNC);
   }

   // 2nd step
   /**
    * @description to add new gateway dropdown with ratio count check.
    */
   addRowGateway(): void {
      this.row_routes_list = this.rowRoutesListFormArray;
      const listLenght = this.customRowGateway.length;
      if (this.row_routes_list.length <= 9 && this.row_routes_list.length < listLenght) {
         // console.log(this.ratioCount());
         if (this.ratioCount() < 100) {
            this.row_routes_list.push(this.createItem());
         }
      }
      // this.formArrayIndex = this.formArrayIndex + 1;
   }
   /**
    * @param index consists of formarray index.
    * @description to remove selected gateway dropdown.
    */
   onCloseRowGateway(index) {
      this.formArrayIndex = index;
      this.row_routes_list = this.rowRoutesListFormArray;
      if (this.row_routes_list.length !== 1) {
         this.defineRowGatewaysList.forEach(gtElement => {
            if (this.row_routes_list.value[index].gw_id === gtElement.gw_id) {
               gtElement.isSelected = false;
            }
         });
         this.row_routes_list.removeAt(index);
         this.formArrayIndex = undefined;
      }
   }
   /**
    * @description gets the row_routes_list ratio count.
    * @returns ratio count.
    */
   private ratioCount(): number {
      this.row_routes_list = this.rowRoutesListFormArray;
      let total = 0;
      this.row_routes_list.value.forEach(element => {
         total += +element.ratio_in_percentage;
      });
      return total;
   }
   /**
    * @description gets the 2nd form row_routes_list formarray data.
    */
   get rowRoutesListFormArray(): FormArray {
      return this.secondFormGroup.get('row_routes_list') as FormArray;
   }
   /**
    * @description gets the 2nd form ratio % Count.
    */
   get getRowRatioCount() {
      return this.ratioCount();
   }
   /**
    * @description to check whether row route is custom or else and initiates the onSubmitAction() method.
    */
   onSecondStepSubmit() {
      this.secondStepSubmitted = true;
      if (this.secondFormGroup.value.row_route !== 'custom') {
         this.secondFormGroup.get('row_routes_list').clearValidators();
         this.secondFormGroup.get('row_routes_list').updateValueAndValidity();
         this.rowRoutesListFormArray.clear();
         this.onSubmitAction();
      } else {
         if (this.getRowRatioCount === 100) {
            this.onSubmitAction();
         }
      }
   }
   /**
    * @description to submit the create a pool route service with require and validated data.
    */
   onSubmitAction() {
      if (this.secondFormGroup.valid) {
         this.secondStepSubmitted = false;
         const loggedInEmpId = this.secondFormGroup.value.loggedinempid.toString();
         this.createAPoolRouteBody.route_name = this.parentForm.value.route_name;
         this.createAPoolRouteBody.gw_type = this.parentForm.value.gw_type;
         this.createAPoolRouteBody.fallback_gw_type = this.parentForm.value.fallback_gw_type;
         this.createAPoolRouteBody.routes_list = this.poolRouteService.previewList;
         this.createAPoolRouteBody.row_route = this.secondFormGroup.value.row_route;
         this.createAPoolRouteBody.row_routes_list = this.secondFormGroup.value.row_routes_list;
         this.createAPoolRouteBody.loggedinempid = loggedInEmpId;
         this.createAPoolRouteBody.comments = this.secondFormGroup.value.comments;
         this.poolRouteService.createAPoolRoute(this.createAPoolRouteBody).subscribe(
            (res: PoolRouteRes) => {
               if (
                  res.responsestatus === environment.APIStatus.success.text &&
                  res.responsecode > environment.APIStatus.success.code
               ) {
                  successAlert(res.message, res.responsestatus);
                  this.router.navigate(['route-management/pool-route']);
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
   }
   /**
    * @param data consists of cloned route data
    * @description to prepopulate 2nd form.
    */
   private setClonedDataIn2ndForm(data: CloneAPoolRouteData) {
      this.secondFormGroup.patchValue({
         secondCtrl: '',
         row_route: data.row_route,
         // row_routes_list: this.formBuilder.array([this.createItem()]),
         loggedinempid: environment.loggedinempid,
         comments: data.comments,
      });
      if (data.row_route === 'custom') {
         this.rowRoutesListFormArray.clear();
         const formArray = this.rowRoutesListFormArray;
         data.row_routes_list.forEach(element => {
            formArray.push(
               this.formBuilder.group({
                  gw_id: [element.gw_id, [Validators.required]],
                  ratio_in_percentage: [element.ratio_in_percentage, [Validators.required]]
               })
            );
         });
      } else {
         this.secondFormGroup.patchValue({
            row_routes_list: []
         });
      }
   }
   // 2nd step
   // 1st step
   /**
    * @description to reset the 1st form.
    */
   firstFormCancel() {
      this.parentForm.patchValue({
         // route_name: '',
         // gw_type: '',
         // fallback_gw_type: 'lcr-direct',
         // firstCtrl: '',
         countryName: '',
         operatorMNC: ''
      });
      this.parentForm.get('countryName').markAsUntouched();
      this.parentForm.get('operatorMNC').markAsUntouched();
      this.parentForm.get('gatewayRatio').markAsUntouched();
      // this.parentFormArray.clear();
      this.gatewayRatio = this.parentFormArray;
      this.gatewayRatio.controls.forEach(ratio => ratio.patchValue(
         {
            gw_id: '',
            ratio_in_percentage: 10
         }
      ));
   }
   /**
    * @description gets the 1st form gatewayRatio Formarray data.
    */
   get parentFormArray(): FormArray {
      return this.parentForm.get('gatewayRatio') as FormArray;
   }
   /**
    * @description gets the gatewayRatio ratio count.
    * @returns ratio count.
    */
   get getRatioCount(): number {
      return this.calculateRatioTotal();
   }
   /**
    * @description gets the gatewayRatio ratio count.
    * @returns ratio count.
    */
   private calculateRatioTotal(): number {
      this.gatewayRatio = this.parentFormArray;
      let total = 0;
      this.gatewayRatio.value.forEach(element => {
         total += +element.ratio_in_percentage;
      });
      return total;
   }
   /**
    * @description to add new gateway dropdown with ratio count check.
    */
   addGateway(): void {
      const listLenght = this.gatewaysList.length;
      this.gatewayRatio = this.parentFormArray;
      if (this.gatewayRatio.length <= 9 && this.gatewayRatio.length < listLenght) {
         if (this.calculateRatioTotal() < 100) {
            this.gatewayRatio.push(this.createItem());
            this.formArrayIndex = undefined;
         }
      }
   }
   /**
    * @param index consists of formarray index.
    * @description to remove selected gateway dropdown.
    */
   onCloseGateway(index) {
      this.gatewayRatio = this.parentFormArray;
      if (this.gatewayRatio.length !== 1) {
         // console.log(this.gatewayRatio.value[index]);
         this.gatewaysList.forEach(element => {
            if (element.gw_id === this.gatewayRatio.value[index].gw_id) {
               element.isSelected = false;
            }
         });
         this.defineRowGatewaysList.forEach(gtElement => {
            if (this.gatewayRatio.value[index].gw_id === gtElement.gw_id) {
               gtElement.isSelected = false;
            }
         });
         // console.log(this.gatewaysList);
         // console.log('second form gateway list when delete', this.defineRowGatewaysList);
         this.gatewayRatio.removeAt(index);
         this.formArrayIndex = undefined;
      }
   }

   onAddNewRoute(stepper: MatStepper, from) {
      this.isSubmitted.emit(true);
      this.submitted = true;
      if (this.parentForm.valid && this.calculateRatioTotal() === 100) {
         // if (from === 'fromOnSubmit') {
         //    this.formArrayIndex = undefined;
         //    stepper.next();
         //    // console.log(this.clonedData);
         //    if (this.clonedData !== undefined) {
         //       //  this.setClonedDataIn2ndForm(this.clonedData);
         //    }
         // } else {
         //    // console.log('in');
         //    // this.onScrollBottom();
         // }
         // this.createSecondForm();
         // this.secondFormGroup.reset();

         this.newRoute.continent = this.selectedCountry[0].continent;
         this.newRoute.country = this.selectedCountry[0].country;
         this.newRoute.mcc = this.selectedCountry[0].mcc;
         this.newRoute.operator = this.selectedOperator[0].operator;
         this.newRoute.mnc = this.selectedOperator[0].mnc;

         this.newRoute.ratios = this.parentForm.value.gatewayRatio;
         // console.log(this.parentForm.value.gatewayRatio);
         // Reset 2nd form gateway.
         // this.parentFormArray.value.forEach(obj => {
         //    if (obj.gw_id === isPrePopulatedGateway.gw_id) {
         //       isPrePopulatedGateway.isSelected = true;
         //    }
         // });
         // console.log(this.parentFormArray.value);
         // console.log(this.newRoute.ratios);
         this.parentFormArray.value.forEach(element1 => {
            // console.log(element1);
            this.defineRowGatewaysList.forEach(element2 => {
               // console.log(element2);
               if (element1.gw_id === element2.gw_id) {
                  element2.isSelected = true;
               }
            });
         });

         // const gatewayRatio = this.parentFormArray;
         // this.defineRowGatewaysList.forEach(gtElement => {
         //    gatewayRatio.value.forEach(selectedGateway => {
         //       if (selectedGateway.gw_id === gtElement.gw_id) {
         //          gtElement.isSelected = true;
         //       }
         //    });
         // });

         // Reset 2nd form gateway.
         // Reset first form gateway.

         // console.log('1st form gateway list', this.gatewaysList);
         // Reset first form gateway.
         this.newRoute.ratios.sort((obj1, obj2) => {
            if (obj1.ratio_in_percentage > obj2.ratio_in_percentage) {
               return 1;
            }
            if (obj1.ratio_in_percentage < obj2.ratio_in_percentage) {
               return -1;
            }
            return 0;
         });
         const obj = JSON.parse(JSON.stringify(this.newRoute));

         // console.log(this.poolRouteService.previewList);
         // if (this.poolRouteService.previewList.length > 1) {
         //    console.log(_.isEqual(this.poolRouteService.previewList[1], obj));
         // }
         this.routeAlreadExist = false;
         this.poolRouteService.previewList.forEach(preview => {
            if (_.isEqual(preview, obj)) {
               this.routeAlreadExist = true;
               errorAlert('Route already exist', 'Warning');
            }
         });

         setTimeout(() => {
            if (!this.routeAlreadExist) {
               if (from === 'fromOnSubmit') {
                  this.formArrayIndex = undefined;
                  stepper.next();
                  if (this.clonedData !== undefined) {
                     //  this.setClonedDataIn2ndForm(this.clonedData);
                  }
               }
               this.gatewaysList.forEach(gtElement => {
                  gtElement.isSelected = false;
               });
               this.poolRouteService.previewList.push(obj);
               this.routesList.emit(from);
               this.firstFormReset();
               this.submitted = false;
               // console.log('second form gateway list', this.defineRowGatewaysList);
               // this.customRowGateway = [];
               this.filterCustomRowGatewayList();
               this.formArrayIndex = undefined;
               this.secondFormReset();
            }
         }, 10);
      }
   }
   firstFormReset() {
      this.parentForm.reset({
         route_name: this.parentForm.value.route_name,
         gw_type: this.parentForm.value.gw_type,
         fallback_gw_type: this.parentForm.value.fallback_gw_type,
         firstCtrl: '',
         countryName: '',
         operatorMNC: ''
      });
      // this.parentFormArray.clear();
      this.gatewayRatio = this.parentFormArray;
      this.gatewayRatio.controls.forEach(ratio => ratio.patchValue(
         {
            gw_id: '',
            ratio_in_percentage: 10
         }
      ));
   }

   onFirstStepSubmit(stepper: MatStepper) {
      if (!this.parentForm.controls.countryName.valid
         && !this.parentForm.controls.operatorMNC.valid
         && this.poolRouteService.previewList.length) {
         // this.createSecondForm();
         // this.secondFormGroup.reset();
         // this.secondFormReset();
         this.firstFormCancel();
         stepper.selected.completed = true;
         this.formArrayIndex = undefined;
         stepper.next();
         if (this.clonedData !== undefined) {
            // this.setClonedDataIn2ndForm(this.clonedData);
         }
      } else {
         this.onAddNewRoute(stepper, 'fromOnSubmit');
      }
   }
   filterCustomRowGatewayList() {
      this.customRowGateway = this.defineRowGatewaysList.filter((customRowGate) => customRowGate.isSelected !== true);
      // console.log('customRowGateway', this.customRowGateway);
   }
   // 1st step

   setFormArrayIndex(i) {
      this.formArrayIndex = i;
   }

   @HostListener('input', ['$event'])
   public onInput(event: any) {
      if (event.target.type === 'number') {
         if (this.stepper.selectedIndex === 1) {
            if (this.ratioCount() > 100) {
               event.target.value = +event.target.value - 10;
               this.setPreviousValue(this.rowRoutesListFormArray, event.target.value);
            }
         } else {
            // console.log(this.calculateRatioTotal());
            if (this.calculateRatioTotal() > 100) {
               event.target.value = +event.target.value - 10;
               this.setPreviousValue(this.parentFormArray, event.target.value);
            }
         }
      }
   }

   setPreviousValue(formArray: FormArray, v) {
      setTimeout(() => {
         formArray.value[this.formArrayIndex].ratio_in_percentage = +v;
      }, 400);
   }

   onChangeSelect(i, form) {
      this.formArrayIndex = i;
      if (form === 'firstForm') {
         if (this.calculateRatioTotal() > 100) {
            this.parentFormArray.value[i].ratio_in_percentage = this.parentFormArray.value[i].ratio_in_percentage - 10;
         }
      } else if (form === 'secondForm') {
         if (this.ratioCount() > 100) {
            this.rowRoutesListFormArray.value[i].ratio_in_percentage = this.rowRoutesListFormArray.value[i].ratio_in_percentage - 10;
         }
      }

   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }
}
