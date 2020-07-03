import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { environment } from '../../../../environments/environment';
import { MatStepper } from '@angular/material';
import { confirmAlert, errorAlert, successAlert } from '../../../shared/sweet-alert/sweet-alert';
import { Observable, Subscription } from 'rxjs';
import {
   GatewaysListData, CountriesListRes, CountriesListData, OperatorsListRes, OperatorsListData
} from '../../models/RouteManagement/Generic/generic';
import { GenericService } from '../../services/RouteManagement/Generic/generic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, startWith, pairwise, distinctUntilChanged } from 'rxjs/operators';
import {
   NewRoutesList, CreateAPoolRouteBody, CloneAPoolRouteData, PoolRouteRes, NewRowRoutesList
} from '../../models/RouteManagement/PoolRoute/poolRoute';
import { Router } from '@angular/router';

@Component({
   selector: 'app-route-stepper-form',
   templateUrl: './route-stepper-form.component.html',
   styleUrls: ['./route-stepper-form.component.css']
})
export class RouteStepperFormComponent implements OnInit, OnDestroy {
   @ViewChild('stepper', { static: false }) stepper: MatStepper;
   isLinear = false;
   @Input() parentFormGroup: FormGroup;
   @Input() gatewaysListObs: Observable<GatewaysListData[]>;
   @Input() previewEditObs: Observable<[boolean, number, string, NewRowRoutesList[]]>;
   @Input() clonedDataObs: Observable<CloneAPoolRouteData>;
   @Input() childDataResetObs: Observable<number>;
   @Input() previewDeleteClickObs: Observable<void>;
   firstStepGatewaysList: GatewaysListData[];
   secondStepGatewaysList: GatewaysListData[];
   secondFormGroup: FormGroup;
   commentsTextAreaMin: number;
   commentsTextAreaMax: number;
   formArrayIndex: number;
   countriesList: CountriesListData[];
   operatorsList: OperatorsListData[];
   sub: Subscription;
   addNewRouteInput: NewRoutesList = new NewRoutesList();
   submitted: boolean;
   @Output() isSubmitted = new EventEmitter();
   @Output() passAddNewRouteEventToParent = new EventEmitter();
   secondStepSubmitted: boolean;
   createAPoolRouteBody: CreateAPoolRouteBody = new CreateAPoolRouteBody();
   editModeState: boolean;
   editModeIndex: number;
   cloneData: CloneAPoolRouteData;
   isClone: boolean;
   continentsCount: number;
   countryCount: number;
   constructor(
      private formBuilder: FormBuilder,
      config: NgbModalConfig,
      private modalService: NgbModal,
      public poolRouteService: PoolRouteService,
      private genericService: GenericService,
      private router: Router,
   ) {
      this.createSecondFormGroup();
      this.commentsTextAreaMin = environment.createClonePoolRouteFieldLength.commentsTextArea.min;
      this.commentsTextAreaMax = environment.createClonePoolRouteFieldLength.commentsTextArea.max;
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
      this.submitted = false;
      this.secondStepSubmitted = false;
      this.editModeState = false;
      this.isClone = false;
      this.loadCountriesList();
      this.initGatewayListSubscribtion(); // get gateway list
      this.initPreviewEditSubscribtion();
      this.initFirstFormArrayValueChangSub();
      this.initSecondFormArrayValChangSub();
      this.initCloneDataSubscribtion();
      this.initResetSubscribtion();
      this.initPreviewDeleteSubscribtion();
   }
   // ------------------------------------- 1st Step --------------------------------
   initPreviewDeleteSubscribtion() {
      this.previewDeleteClickObs.subscribe(() => {
         if (!this.poolRouteService.previewList.length) {
            if (this.stepper.selectedIndex === 1) {
               this.stepper.previous();
            }
         }
      });
   }
   initPreviewEditSubscribtion() {
      this.editModeState = false;
      this.previewEditObs.subscribe(([value, index, countryName, prePopulatedGateway]) => {
         this.onScrollTop();
         if (this.stepper.selectedIndex === 1) {
            this.stepper.previous();
         }
         this.formArrayIndex = undefined;
         this.editModeState = value; // value = true;
         this.editModeIndex = index;
         this.countriesList.forEach(countryObj => {
            if (countryObj.country === countryName) {
               this.loadOperatorsList(countryObj.country_code);
            }
         });
         // console.log(prePopulatedGateway);
         // ---------------- gateway reset ----------------
         this.firstStepGatewaysList.forEach(gtElement => {
            gtElement.isSelected = false;
         });
         // ---------------- gateway reset ----------------
         this.firstStepGatewaysList.forEach(firstStepGatewaysObj => {
            prePopulatedGateway.forEach(prePopulatedGatewayObj => {
               if (prePopulatedGatewayObj.gw_id === firstStepGatewaysObj.gw_id) {
                  firstStepGatewaysObj.isSelected = true;
               }
            });
         });
      });
   }
   initFirstFormArrayValueChangSub() {
      this.sub = this.firstStepFormArray.valueChanges
         .pipe(debounceTime(100), startWith(null), pairwise())
         .subscribe(([prev, next]: [NewRowRoutesList[], NewRowRoutesList[]]) => {
            // console.log(prev);
            // console.log(next);
            // console.log(this.formArrayIndex);
            if (this.formArrayIndex !== undefined) {
               if (prev === null) {
                  this.firstStepGatewaysList.forEach(element => {
                     if (element.gw_id === next[this.formArrayIndex].gw_id) {
                        element.isSelected = true;
                     }
                  });
               } else if (prev[this.formArrayIndex].gw_id !== next[this.formArrayIndex].gw_id) {
                  this.firstStepGatewaysList.forEach(element => {
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
   loadCountriesList() {
      this.genericService.getCountriesList().subscribe(
         (res: CountriesListRes) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.countriesList = res.data;
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
   selectCountryGetOperatorList(countryName, changeEvent) {
      const selectedIndex: number = changeEvent.target.selectedIndex;
      const selectedMcc = +changeEvent.target.options[selectedIndex].getAttribute('data-mcc');
      const selectedContinent = changeEvent.target.options[selectedIndex].getAttribute('data-continent');
      const selectedCountryCode = +changeEvent.target.options[selectedIndex].getAttribute('data-country_code');

      this.parentFormGroup.patchValue({
         continent: selectedContinent,
         country: countryName,
         mcc: selectedMcc,
         operator: '',
         mnc: ''
      }); // add continent, country, mcc to parentFormGroup.
      this.operatorsList = [];
      // console.log(countryName, selectedMcc, selectedContinent, selectedCountryCode);
      this.loadOperatorsList(selectedCountryCode);

   }
   loadOperatorsList(countryCode: number) {
      this.genericService.getOperatorsList({ country_code: countryCode }).subscribe(
         (res: OperatorsListRes) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.operatorsList = res.data;
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
   selectOperatorDropdown(operatorName, changeEvent) {
      const selectedIndex: number = changeEvent.target.selectedIndex;
      const selectedMnc = +changeEvent.target.options[selectedIndex].getAttribute('data-mnc');
      this.parentFormGroup.patchValue({
         operator: operatorName,
         mnc: selectedMnc
      }); // add operator, mnc to parentFormGroup.
   }
   get firstStepFormArray(): FormArray {
      return this.poolRouteService.formArray(this.parentFormGroup, 'ratios');
   }
   addGateway(): void {
      if (this.firstStepGatewaysList) {
         const listLenght = this.firstStepGatewaysList.length;
         const firstFormArray = this.firstStepFormArray;
         if (firstFormArray.length <= 9 && firstFormArray.length < listLenght) {
            if (this.firstStepRatioTotal < 100) {
               firstFormArray.push(this.poolRouteService.createItem());
               this.formArrayIndex = undefined;
            }
         }
      } else {
         errorAlert('Please select gateway type', 'warning');
      }

   }
   onCloseGateway(index) {
      const firstFormArray = this.firstStepFormArray;
      if (firstFormArray.length > 1) {
         this.firstStepGatewaysList.forEach(firstStepGatewaysListObj => {
            if (firstStepGatewaysListObj.gw_id === firstFormArray.value[index].gw_id) {
               firstStepGatewaysListObj.isSelected = false;
            }
         });
         firstFormArray.removeAt(index);
         this.formArrayIndex = undefined;
      }
   }
   get firstStepRatioTotal() {
      return this.calculateRatioTotal(this.firstStepFormArray);
   }
   onNext(stepper: MatStepper) {
      // console.log(this.parentForm);
      if (!this.editModeState) {
         if (this.poolRouteService.previewList.length) {
            if (this.parentFormGroup.get('country').dirty || this.parentFormGroup.get('operator').dirty || this.firstStepFormArray.dirty) {
               confirmAlert('Your unsaved data will get erased', 'Yes, delete it!')
                  .then((result) => {
                     if (result.isConfirmed) {
                        stepper.next();
                        this.parentFormGroupReset();
                     }
                  });
            } else {
               stepper.next();
            }
         } else {
            errorAlert('Add at least one country & operator', 'warning');
         }
      } else {
         errorAlert('You are in edit mode', 'Warning');
      }

   }
   parentFormGroupReset() {
      this.operatorsList = [];
      // this.initCountrySubscription('');
      const form = this.parentFormGroup;
      this.parentFormGroup.reset({
         route_name: form.value.route_name,
         gw_type: form.value.gw_type,
         fallback_gw_type: form.value.fallback_gw_type,
         firstCtrl: '',
         continent: '',
         country: '',
         mcc: '',
         operator: '',
         mnc: ''
      });
      const firstFormArray = this.firstStepFormArray;
      firstFormArray.clear();
      firstFormArray.push(this.poolRouteService.createItem());
   }
   onAddNewRouteFormSubmit() {
      // if (this.parentFormGroup.valid) {
      this.isSubmitted.emit(true);
      this.submitted = true;
      if (this.parentFormGroup.value && this.firstStepRatioTotal === 100) {
         this.submitted = false;
         this.addNewRouteInput.continent = this.parentFormGroup.value.continent;
         this.addNewRouteInput.country = this.parentFormGroup.value.country;
         this.addNewRouteInput.mcc = this.parentFormGroup.value.mcc;
         this.addNewRouteInput.operator = this.parentFormGroup.value.operator;
         this.addNewRouteInput.mnc = this.parentFormGroup.value.mnc;
         this.addNewRouteInput.ratios = this.firstStepFormArray.value;
         // console.log(this.addNewRouteInput);
         const obj = JSON.parse(JSON.stringify(this.addNewRouteInput));
         if (this.poolRouteService.previewList.length) {
            let countryOperatorAlreadExist = false;
            this.poolRouteService.previewList.forEach((element, index) => {
               if (element.country === obj.country && element.operator === obj.operator) {
                  if (index === this.editModeIndex) {
                     countryOperatorAlreadExist = false;
                  } else {
                     errorAlert('Route already exist', 'Warning');
                     countryOperatorAlreadExist = true;
                  }
               }
            });
            if (!countryOperatorAlreadExist) {
               if (this.editModeState) {
                  this.poolRouteService.previewList.forEach((element, index) => {
                     if (index === this.editModeIndex) {
                        element.continent = obj.continent;
                        element.country = obj.country;
                        element.mcc = obj.mcc;
                        element.operator = obj.operator;
                        element.ratios = obj.ratios;
                     }
                  });
                  this.editModeState = false;
                  this.editModeIndex = undefined;
                  this.formArrayIndex = undefined;
                  this.parentFormGroupReset();
                  this.passAddNewRouteEventToParent.emit();
               } else {
                  this.pushNewRouteToPreviewList(obj);
               }
            }
         } else {
            this.pushNewRouteToPreviewList(obj);
         }
      }

      // }
   }
   pushNewRouteToPreviewList(obj) {
      this.formArrayIndex = undefined;
      this.editModeState = false;
      this.editModeIndex = undefined;
      this.firstStepGatewaysList.forEach(gtElement => {
         gtElement.isSelected = false;
      });
      this.poolRouteService.previewList.push(obj);
      this.passAddNewRouteEventToParent.emit();
      this.parentFormGroupReset();
   }
   // ------------------------------------- 1st Step --------------------------------

   // ------------------------------------- common ----------------------------------
   initResetSubscribtion() {
      this.sub = this.childDataResetObs.subscribe((num) => {
         // console.log(num); // 1=> 1st step reset, 2=> full reset
         this.parentFormGroupReset();
         if (num === 2) {
            this.initRowGateway();
            if (this.stepper.selectedIndex === 1) {
               this.stepper.previous();
            }
         }
      });
   }
   private calculateRatioTotal(formArray: FormArray) {
      let total = 0;
      formArray.value.forEach(element => {
         total += +element.ratio_in_percentage;
      });
      return total;
   }
   @HostListener('input', ['$event'])
   public onOuterAndInnerSpinClick(event: any) {
      if (event.target.type === 'number') {
         if (this.stepper.selectedIndex === 1) {
            if (this.secondStepRatioTotal > 100) {
               event.target.value = +event.target.value - 10;
               this.setPreviousValue(this.secondStepFormArray, event.target.value);
            }
         } else {
            if (this.firstStepRatioTotal > 100) {
               event.target.value = +event.target.value - 10;
               this.setPreviousValue(this.firstStepFormArray, event.target.value);
            }
         }
      }
   }
   setPreviousValue(formArray: FormArray, v) {
      setTimeout(() => {
         formArray.value[this.formArrayIndex].ratio_in_percentage = +v;
      }, 400);
   }
   setFormArrayIndex(i) {
      this.formArrayIndex = i;
   }
   onChangeSelect(i, form) {
      this.formArrayIndex = i;
      if (form === 'firstForm') {
         if (this.firstStepRatioTotal > 100) {
            this.firstStepFormArray.value[i].ratio_in_percentage = this.firstStepFormArray.value[i].ratio_in_percentage - 10;
         }
      } else if (form === 'secondForm') {
         if (this.secondStepRatioTotal > 100) {
            this.secondStepFormArray.value[i].ratio_in_percentage = this.secondStepFormArray.value[i].ratio_in_percentage - 10;
         }
      }

   }
   initGatewayListSubscribtion() {
      this.sub = this.gatewaysListObs.subscribe((list: GatewaysListData[]) => {
         this.firstStepGatewaysList = list;
         this.secondStepGatewaysList = JSON.parse(JSON.stringify(this.firstStepGatewaysList));
         if (this.isClone) {
            this.secondStepGatewaysList.forEach(secondStepGatewaysListObj => {
               this.cloneData.row_routes_list.forEach(element => {
                  if (element.gw_id === secondStepGatewaysListObj.gw_id) {
                     secondStepGatewaysListObj.isSelected = true;
                  }
               });
            });
            this.isClone = false;
         }
         // else {
         //    this.secondStepGatewaysList.forEach(secondStepGatewaysListObj => {
         //       secondStepGatewaysListObj.isSelected = false;
         //    });
         // }
      });
   }
   ngOnDestroy() {
      this.sub.unsubscribe();
   }
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
   // ------------------------------------- common ----------------------------------

   // ------------------------------------2nd Step ----------------------------------
   initCloneDataSubscribtion() {
      this.sub = this.clonedDataObs.subscribe((prePopulatingData: CloneAPoolRouteData) => {
         this.isClone = true;
         // console.log(prePopulatingData);
         this.cloneData = prePopulatingData;
         this.secondFormGroup.patchValue({
            row_route: prePopulatingData.row_route,
            comments: prePopulatingData.comments
         });
         if (prePopulatingData.row_route === 'custom') {
            const secondFormArray = this.secondStepFormArray;
            secondFormArray.clear();
            prePopulatingData.row_routes_list.forEach(element => {
               secondFormArray.push(
                  this.formBuilder.group({
                     gw_id: element.gw_id,
                     ratio_in_percentage: element.ratio_in_percentage
                  })
               );
            });
         } else {
            this.secondFormGroup.patchValue({
               row_routes_list: []
            });
         }
      });

   }
   createSecondFormGroup() {
      this.secondFormGroup = this.formBuilder.group({
         secondCtrl: [''],
         row_route: ['block'],
         row_routes_list: this.formBuilder.array([this.poolRouteService.createItem()]),
         loggedinempid: environment.loggedinempid,
         comments: ['', [Validators.required]]
      });
   }
   get rowRouteValue() {
      return this.secondFormGroup.get('row_route').value;
   }
   get secondStepFormArray(): FormArray {
      return this.poolRouteService.formArray(this.secondFormGroup, 'row_routes_list');
   }
   addRowGateway(): void {
      const listLenght = this.secondStepGatewaysList.length;
      const secondFormArray = this.secondStepFormArray;
      if (secondFormArray.length <= 9 && secondFormArray.length < listLenght) {
         if (this.secondStepRatioTotal < 100) {
            secondFormArray.push(this.poolRouteService.createItem());
            // this.formArrayIndex = undefined;
         }
      }
   }
   onCloseRowGateway(index) {
      // this.formArrayIndex = index;
      const secondFormArray = this.secondStepFormArray;
      if (secondFormArray.length > 1) {
         this.secondStepGatewaysList.forEach(secondStepGatewaysListObj => {
            if (secondFormArray.value[index].gw_id === secondStepGatewaysListObj.gw_id) {
               secondStepGatewaysListObj.isSelected = false;
            }
         });
         secondFormArray.removeAt(index);
         this.formArrayIndex = undefined;
      }
   }
   get secondStepRatioTotal() {
      return this.calculateRatioTotal(this.secondStepFormArray);
   }
   initSecondFormArrayValChangSub() {
      this.sub = this.secondStepFormArray.valueChanges
         .pipe(debounceTime(100), distinctUntilChanged(), startWith(null), pairwise())
         .subscribe(([prev, next]: [NewRowRoutesList[], NewRowRoutesList[]]) => {
            if (this.formArrayIndex !== undefined) {
               if (prev === null) {
                  this.secondStepGatewaysList.forEach(element => {
                     if (element.gw_id === next[this.formArrayIndex].gw_id) {
                        element.isSelected = true;
                     }
                  });
               } else if (prev[this.formArrayIndex].gw_id !== next[this.formArrayIndex].gw_id) {
                  this.secondStepGatewaysList.forEach(element => {
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
   initRowGateway() {
      const secondFormArray = this.secondStepFormArray;
      secondFormArray.clear();
      secondFormArray.push(this.poolRouteService.createItem());
   }
   onSecondStepSubmit() {
      this.secondStepSubmitted = true;
      if (this.rowRouteValue !== 'custom') {
         const secondFormArray = this.secondStepFormArray;
         secondFormArray.clearValidators();
         secondFormArray.updateValueAndValidity();
         secondFormArray.clear();
         this.createPoolRouteOnSubmit();
      } else {
         if (this.secondStepRatioTotal === 100) {
            this.createPoolRouteOnSubmit();
         }
      }
   }
   createPoolRouteOnSubmit() {
      if (this.secondFormGroup.valid) {
         this.secondStepSubmitted = false;
         const loggedInEmpId = this.secondFormGroup.value.loggedinempid.toString();
         this.createAPoolRouteBody.route_name = this.parentFormGroup.value.route_name;
         this.createAPoolRouteBody.gw_type = this.parentFormGroup.value.gw_type;
         this.createAPoolRouteBody.fallback_gw_type = this.parentFormGroup.value.fallback_gw_type;
         this.createAPoolRouteBody.routes_list = this.poolRouteService.previewList;
         this.createAPoolRouteBody.row_route = this.secondFormGroup.value.row_route;
         this.createAPoolRouteBody.row_routes_list = this.secondStepFormArray.value;
         this.createAPoolRouteBody.loggedinempid = loggedInEmpId;
         this.createAPoolRouteBody.comments = this.secondFormGroup.value.comments;
         // console.log(this.createAPoolRouteBody);
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
   // ------------------------------------2nd Step ----------------------------------
}
