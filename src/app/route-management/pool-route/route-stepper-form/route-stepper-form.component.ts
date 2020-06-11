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
   @Input() parentForm: FormGroup;
   @Input() gatewaysList: GatewaysListData[];
   @Input() clonedData: CloneAPoolRouteData;
   @Input() isClone: boolean;
   @Output() isSubmitted = new EventEmitter();
   @Output() routesList = new EventEmitter();
   // @ViewChild('stepper') stepper: MatStepper;
   sub: Subscription;
   // currentYOffSet: number;
   constructor(
      private formBuilder: FormBuilder,
      config: NgbModalConfig,
      private modalService: NgbModal,
      private genericService: GenericService,
      private poolRouteService: PoolRouteService,
      private router: Router,
      private el: ElementRef
   ) { }

   open(content) {
      this.modalService.open(content,
         { windowClass: 'gt-preview-modal' }
      );
   }

   ngOnInit() {
      this.routeEditMode = false;
      this.sub = this.poolRouteService.currentSubjectData.subscribe((data) => {
         // console.log(`subjectData ${data}`);
         if (data === 1) {
            this.routeEditMode = true;
            this.selectCountry();
            if (this.poolRouteService.previewList.length > 1) {
               this.onScrollTop();
            }
            if (this.stepper.selectedIndex === 1) {
               this.stepper.previous();
            }
         } else if (data === 2) {
            // alert('in');
            this.createSecondForm();
            if (this.stepper.selectedIndex === 1) {
               this.stepper.previous();
            }
         } else if (data === 3) {
            if (!this.poolRouteService.previewList.length) {
               if (this.stepper.selectedIndex === 1) {
                  this.stepper.previous();
               }
            }
         }
      });
      this.submitted = false;
      this.secondStepSubmitted = false;
      this.createSecondForm();
      this.loadCountriesList();
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
   private createSecondForm() {
      this.secondFormGroup = this.formBuilder.group({
         secondCtrl: [''],
         row_route: ['block', [Validators.required]],
         row_routes_list: this.formBuilder.array([this.createItem()]),
         loggedinempid: environment.loggedinempid,
         comments: ['', [Validators.required]]
      });
   }
   createItem(): FormGroup {
      return this.formBuilder.group({
         gw_id: ['', [Validators.required]],
         ratio_in_percentage: [10, [Validators.required]]
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
               // console.log(this.isClone);
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
   selectCountry() {
      this.selectedCountry = this.countriesList.filter((element) => element.country === this.parentForm.value.countryName);
      this.loadOperatorsList(this.selectedCountry[0].country_code);
   }
   loadOperatorsList(countryCode: number) {
      this.genericService.getOperatorsList({ country_code: countryCode }).subscribe(
         (res: OperatorsListRes) => {
            if (
               res.responsestatus === environment.APIStatus.success.text &&
               res.responsecode > environment.APIStatus.success.code
            ) {
               this.operatorsList = res.data;
               if (this.isClone) {
                  this.selectOperator();
                  this.isClone = false;
               } else if (this.routeEditMode) {
                  this.selectOperator();
                  this.routeEditMode = false;
               } else {
                  this.parentForm.patchValue({
                     operatorMNC: this.operatorsList[0].mnc
                  });
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
   selectOperator() {
      this.selectedOperator = this.operatorsList.filter((element) => element.mnc === this.parentForm.value.operatorMNC);
   }

   // 2nd step
   addRowGateway(): void {
      this.row_routes_list = this.rowRoutesListFormArray;
      if (this.row_routes_list.length <= 9) {
         // console.log(this.ratioCount());
         if (this.ratioCount() < 100) {
            this.row_routes_list.push(this.createItem());
         }
      }
   }
   onCloseRowGateway(index) {
      this.row_routes_list = this.rowRoutesListFormArray;
      if (this.row_routes_list.length !== 1) {
         this.row_routes_list.removeAt(index);
      }
   }
   private ratioCount(): number {
      this.row_routes_list = this.rowRoutesListFormArray;
      let total = 0;
      this.row_routes_list.value.forEach(element => {
         total += +element.ratio_in_percentage;
      });
      return total;
   }
   get rowRoutesListFormArray(): FormArray {
      return this.secondFormGroup.get('row_routes_list') as FormArray;
   }
   get getRowRatioCount() {
      return this.ratioCount();
   }
   onSecondStepSubmit() {
      this.secondStepSubmitted = true;
      if (this.secondFormGroup.value.row_route !== 'custom') {
         this.secondFormGroup.get('row_routes_list').clearValidators();
         this.secondFormGroup.get('row_routes_list').updateValueAndValidity();
         this.rowRoutesListFormArray.clear();
         this.onSubmitAction();
      } else {
         // console.log(this.getRowRatioCount);
         if (this.getRowRatioCount === 100) {
            this.onSubmitAction();
         }
      }
   }
   onSubmitAction() {
      if (this.secondFormGroup.valid) {
         this.secondStepSubmitted = false;
         this.createAPoolRouteBody.route_name = this.parentForm.value.route_name;
         this.createAPoolRouteBody.gw_type = this.parentForm.value.gw_type;
         this.createAPoolRouteBody.fallback_gw_type = this.parentForm.value.fallback_gw_type;
         this.createAPoolRouteBody.routes_list = this.poolRouteService.previewList;
         this.createAPoolRouteBody.row_route = this.secondFormGroup.value.row_route;
         this.createAPoolRouteBody.row_routes_list = this.secondFormGroup.value.row_routes_list;
         this.createAPoolRouteBody.loggedinempid = this.secondFormGroup.value.loggedinempid;
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
      this.gatewayRatio = this.parentFormArray;
      this.gatewayRatio.controls.forEach(ratio => ratio.patchValue(
         {
            gw_id: '',
            ratio_in_percentage: 10
         }
      ));
   }
   get parentFormArray(): FormArray {
      return this.parentForm.get('gatewayRatio') as FormArray;
   }

   get getRatioCount(): number {
      return this.calculateRatioTotal();
   }

   private calculateRatioTotal(): number {
      this.gatewayRatio = this.parentFormArray;
      let total = 0;
      this.gatewayRatio.value.forEach(element => {
         total += +element.ratio_in_percentage;
      });
      return total;
   }

   addGateway(): void {
      this.gatewayRatio = this.parentFormArray;
      if (this.gatewayRatio.length <= 9) {
         if (this.calculateRatioTotal() < 100) {
            this.gatewayRatio.push(this.createItem());
         }
      }
   }

   onCloseGateway(index) {
      this.gatewayRatio = this.parentFormArray;
      if (this.gatewayRatio.length !== 1) {
         this.gatewayRatio.removeAt(index);
         // this.gatewayRatio.updateValueAndValidity();
      }
   }

   onAddNewRoute(stepper: MatStepper, from) {
      this.isSubmitted.emit(true);
      this.submitted = true;
      if (this.parentForm.valid && this.calculateRatioTotal() === 100) {
         if (from === 'fromOnSubmit') {
            stepper.next();
            // console.log(this.clonedData);
            if (this.clonedData !== undefined) {
               this.setClonedDataIn2ndForm(this.clonedData);
            }
         } else {
            // console.log('in');
            // this.onScrollBottom();
         }
         this.newRoute.continent = this.selectedCountry[0].continent;
         this.newRoute.country = this.selectedCountry[0].country;
         this.newRoute.mcc = this.selectedCountry[0].mcc;
         this.newRoute.mnc = this.selectedOperator[0].mnc;
         this.newRoute.operator = this.selectedOperator[0].operator;
         this.newRoute.ratios = this.parentForm.value.gatewayRatio;
         const obj = JSON.parse(JSON.stringify(this.newRoute));
         this.poolRouteService.previewList.push(obj);
         // this.newRoutesList.push(obj);
         this.routesList.emit(from);
         this.parentForm.reset({
            route_name: this.parentForm.value.route_name,
            gw_type: this.parentForm.value.gw_type,
            fallback_gw_type: this.parentForm.value.fallback_gw_type,
            firstCtrl: '',
            countryName: '',
            operatorMNC: ''
         });

         this.gatewayRatio = this.parentFormArray;
         this.gatewayRatio.controls.forEach(ratio => ratio.patchValue(
            {
               gw_id: '',
               ratio_in_percentage: '10'
            }
         ));
         this.submitted = false;
      }
   }

   onFirstStepSubmit(stepper: MatStepper) {
      if (!this.parentForm.controls.countryName.valid
         && !this.parentForm.controls.operatorMNC.valid
         && this.poolRouteService.previewList.length) {
         this.firstFormCancel();
         stepper.selected.completed = true;
         stepper.next();
         if (this.clonedData !== undefined) {
            this.setClonedDataIn2ndForm(this.clonedData);
         }
      } else {
         this.onAddNewRoute(stepper, 'fromOnSubmit');
      }
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
