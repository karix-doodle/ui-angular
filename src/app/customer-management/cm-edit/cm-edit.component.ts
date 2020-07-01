import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerManagementService } from '../services/customer-management.service';
import { UserActivation_ApiResponse, UserRoutingConfig, TimeZonesApiResponse, Gateway, Pool, ApiResponse_Generic, PoolRouteSearchRes } from '../models/customer-management.model';
import { environment } from '../../../environments/environment';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  errorAlert,
  successAlert,
  confirmAlert
} from "../../shared/sweet-alert/sweet-alert";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-cm-edit',
  templateUrl: './cm-edit.component.html',
  styleUrls: ['./cm-edit.component.css']
})
export class CmEditComponent implements OnInit {
  public params: any;

  apiResponse : UserActivation_ApiResponse;
  usersData: UserRoutingConfig;
  esmeaddr: string;
  process_row: any = 0;
  charsetEncodings: string[];
  dlrTypes: string[];
  selectedCharSetEncoding: string;
  selectedDlrType: string;
  lcrOnly: number = 0;
  selectedCustomerType: string;
  customerTypes: string[];
  lcrRouteType: string[];
  selectedRouteType: string;
  billplanName: string = '';
  timeZones: string[];
  selectedTzString: string = ' ';
  selectedTimezone: string;
  selectedTimezoneOffset: string;
  gateways: Gateway[];
  primary_gwid: string;
  fallback_gwid: string;
  poolRoutes: Pool[];
  selectedPoolRouteId: string;
  selectedPoolRouteName: string;
  process_at_loss: number = 0;
  max_loss_per_sms: number = 0.000000;
  effectiveTill: string;
  is_permanent: number = 0;
  timeZonesMap: any = {};
  showMargin: boolean = false;
  showEditPage: boolean = true;

  gwRadioEnabled:boolean = true;
  lcrRadioEnabled:boolean = true;
  prRadioEnabled:boolean = true;

  routeTypeUiMapping: any = {
    "lcr":"lcr", "gateway":"gt", "pool":"pr"
  };

  routeTypeNodeMapping: any = {
    "lcr":"lcr", "gt":"gateway", "pr":"pool"
  };

  dateTimeFormat: string = 'YYYY-MM-DD HH:mm';
  showdropdown: boolean = false;

  updateAccountFormGroup: FormGroup;

  constructor(config: NgbModalConfig, private modalService: NgbModal,private customerManagementService: CustomerManagementService,
    private router: Router, private activeRoute: ActivatedRoute, private formBuilder: FormBuilder) 
  {
    this.updateAccountFormGroup = this.formBuilder.group({
      billplanName: new FormControl({value: this.billplanName, disabled: true}),
      selectedCharSetEncoding:new FormControl(),
      selectedDlrType: new FormControl(),
      selectedCustomerType: new FormControl({value: this.selectedCustomerType}, [Validators.required]),
      lcrOnly: new FormControl(),
      selectedRouteType: new FormControl({value: this.selectedRouteType}, [Validators.required]),
      primary_gwid: new FormControl(),
      fallback_gwid: new FormControl(),
      selectedPoolRouteId: new FormControl(),
      selectedPoolRouteName: new FormControl({value:''}),
      process_row: new FormControl(),
      process_at_loss: new FormControl(),
      max_loss_per_sms: new FormControl(),
      selectedTzString: new FormControl(),
      comments: new FormControl(),
      notifysales: new FormControl(),
      notifyclient: new FormControl(),
      effectiveTill: new FormControl(),
    });
    /*
    let effectiveDate = moment().utcOffset(environment.UTC).format('DD:MM:YYYY');
    let effectiveTime = moment().utcOffset(environment.UTC).format('hh:mm am');
    this.params = {
      effectiveDate: effectiveDate,
      effectiveTime: effectiveTime
    }*/
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.charsetEncodings = environment.charsetEncode;
    this.dlrTypes = environment.dlrType;
    this.customerTypes = environment.customerTypes;
    this.getTimeZones();

    // keep this as last call so that all select boxes loaded before this.
    let esmeaddr = this.activeRoute.snapshot.params.esmeaddr;
    this.getPendingUserDetails(esmeaddr);
  }
  private selectedLink: string="";  
  
  initialisePoolSearchSuggestion() {
    const form = this.updateAccountFormGroup;
    form.get('selectedPoolRouteName').valueChanges.pipe(
      debounceTime(20),
      distinctUntilChanged(),
      switchMap(query => this.customerManagementService.getMatchingPoolRoutes(this.selectedCustomerType, this.usersData.msg_type, this.lcrOnly, form.value.selectedPoolRouteName))
    ).subscribe((res: PoolRouteSearchRes) => {
      if (this.selectedPoolRouteName != form.value.selectedPoolRouteName) {
        this.updateAccountFormGroup.patchValue({
          id: ''
        })
        this.showdropdown = true;
      }
      if (res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code) {
        this.poolRoutes = res.data;
      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        this.poolRoutes = [];
        errorAlert(res.message, res.responsestatus);
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText);
    });
  };

  onSelectPoolRoute(poolRoute: Pool) {
    this.updateAccountFormGroup.patchValue({
      selectedPoolRouteName: poolRoute.route_name
    });
    this.selectedPoolRouteName = poolRoute.route_name;
    this.selectedPoolRouteId = poolRoute.id;
    this.updateAccountFormGroup.get('selectedPoolRouteId').setValue(poolRoute.id);
    this.updateAccountFormGroup.get('selectedPoolRouteName').setValue(poolRoute.route_name);
    this.showdropdown = false;
  }
  
  async setradio(e: string) {  
    this.selectedLink = e;
    this.selectedRouteType = e;
    this.routeTypeError = '';
    if(_.isEqual(this.selectedLink,'gt')){
      this.selectedPoolRouteName = null;
      this.selectedPoolRouteId = null;
      this.updateAccountFormGroup.get('selectedPoolRouteId').setValue(null);
      this.updateAccountFormGroup.get('selectedPoolRouteName').setValue(null);
      await this.customerManagementService.getGateways(this.selectedCustomerType, this.usersData.msg_type, this.lcrOnly).then((response)=>{
        this.gateways = response['data'];
        this.setRoutingValues();
      });
    }else if(_.isEqual(this.selectedLink,'pr')){
      this.initialisePoolSearchSuggestion();
      this.setRoutingValues();
    }else{
      this.lcrRouteType = [this.selectedCustomerType];
      this.setRoutingValues();
    }
  };

  onChangeCustomerType(event: any): void {  
    this.selectedCustomerType = event.target.value;
    this.isSelected(this.selectedRouteType);
    this.setradio(this.selectedRouteType);
  };

  onChangeLcrOnly(event: any): void {  
    if(event.target.checked){
      this.lcrOnly = 1;
      this.lcrRadioEnabled = true;
      this.gwRadioEnabled = true;
      this.prRadioEnabled = true;
      this.isSelected(this.selectedRouteType);
      this.setradio(this.selectedRouteType);
    }else{
      confirmAlert('Unchecking LCR will disable Least cost & pool routings', 'Ok').then((result) => {
        if (result.isConfirmed) {
          this.lcrOnly = 0;
          this.gwRadioEnabled = true;
          this.lcrRadioEnabled = false;
          this.prRadioEnabled = false;
          this.selectedRouteType === 'gt';
          this.isSelected('gt');
          this.setradio('gt');
          this.updateAccountFormGroup.controls['selectedRouteType'].setValue('gt');
        }else{
          this.updateAccountFormGroup.controls['lcrOnly'].setValue('1');
          this.lcrOnly = 1;
        }
      });
    }
  };

  setRoutingValues(): void {  
    this.updateAccountFormGroup.controls['selectedRouteType'].setValue(this.selectedRouteType);
    if(_.isEqual(this.selectedRouteType,'gt')){
      if(_.size(this.gateways) > 0){
        this.primary_gwid = this.gateways[0].gw_id;
      }
      if(_.size(this.gateways) > 1){
        this.fallback_gwid = this.gateways[1].gw_id;
      }else{
        this.fallback_gwid = this.gateways[0].gw_id;
      }
      this.updateAccountFormGroup.controls['primary_gwid'].setValue(this.primary_gwid);
      this.updateAccountFormGroup.controls['fallback_gwid'].setValue(this.fallback_gwid);
      this.updateAccountFormGroup.controls['selectedPoolRouteId'].setValue('');
      this.updateAccountFormGroup.controls['selectedPoolRouteName'].setValue('');
      this.poolRoutes = [];
    }else if(_.isEqual(this.selectedRouteType,'pr')){
      this.updateAccountFormGroup.controls['selectedPoolRouteId'].setValue(this.selectedPoolRouteId);
      this.updateAccountFormGroup.controls['selectedPoolRouteName'].setValue(this.selectedPoolRouteName);
      this.updateAccountFormGroup.controls['primary_gwid'].setValue('');
      this.updateAccountFormGroup.controls['fallback_gwid'].setValue('');
      this.gateways = [];
    }else{
      this.updateAccountFormGroup.controls['primary_gwid'].setValue('');
      this.updateAccountFormGroup.controls['fallback_gwid'].setValue('');
      this.updateAccountFormGroup.controls['selectedPoolRouteId'].setValue('');
      this.updateAccountFormGroup.controls['selectedPoolRouteName'].setValue('');
      this.gateways = [];
      this.poolRoutes = [];
    }
  };

  isSelected(name: string): boolean {  
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
        return false;  
    }  
    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
};


  getTimeZones(): void{
    this.customerManagementService.getTimeZones().subscribe(
      (res: TimeZonesApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code){
          _.forEach(res.data,(timezone)=>{
            let key = `${timezone.country_name}_${timezone.offset}`;
            timezone['cntry_offset'] = key;
            this.timeZonesMap[key] = timezone;
          });
          this.timeZones = JSON.parse(JSON.stringify(res.data));
        }else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  };

  onChangeTimezone(event: any): void { 
    let key = event.target.value;
    let timeZone = this.timeZonesMap[key];
    let utcPortion = `(UTC${timeZone.offset})`;
    let timezone = _.replace(timeZone.timezone,utcPortion,'');
    this.selectedTimezone = `${_.trim(timeZone.country_name)}/${_.trim(timezone)}`;
    this.selectedTimezoneOffset = _.trim(timeZone.offset);
  };

  getPendingUserDetails(esmeaddr) {
    this.esmeaddr = esmeaddr;
    this.customerManagementService.getPendingUserDetails(esmeaddr).subscribe(
      (res: UserActivation_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.apiResponse = res;
          this.usersData = JSON.parse(JSON.stringify(this.apiResponse.data));

          let rtype = this.routeTypeUiMapping[_.toLower(this.usersData.routetype)];
          if(_.isEqual(rtype,'lcr')){
            this.lcrRouteType = [this.usersData.lcr_route];
          }

          if(this.usersData.process_at_loss == 0){
            this.updateAccountFormGroup.controls['max_loss_per_sms'].setValue('');
            this.updateAccountFormGroup.controls['max_loss_per_sms'].disable({onlySelf:true});
          }

          if(!_.isEmpty(_.trim(this.usersData.timezone)) && !_.isEmpty(_.trim(this.usersData.timezone_offset))){
            let tz = _.split(this.usersData.timezone,'/')[0];
            this.selectedTzString = `${_.trim(tz)}_${_.trim(this.usersData.timezone_offset)}`;
            this.selectedTimezone = _.trim(this.usersData.timezone);
            this.selectedTimezoneOffset = _.trim(this.usersData.timezone_offset);
          }
          this.selectedCustomerType = this.usersData.intl_routetype;
          this.selectedLink = rtype;
          this.selectedRouteType = rtype;

          if(_.isEqual(rtype,'gt')){
            this.customerManagementService.getGateways(this.selectedCustomerType, this.usersData.msg_type, this.lcrOnly).then((response)=>{
              this.gateways = response['data'];
              this.setDefaultValues(rtype);
            });
          }else if(_.isEqual(rtype,'pr')){
            this.customerManagementService.getPoolRoutes(this.selectedCustomerType, this.usersData.msg_type, this.lcrOnly).then((response)=>{
              this.poolRoutes = response['data'];
              this.setDefaultValues(rtype);
            });
          }else{
            this.lcrRouteType = [this.selectedCustomerType];
            this.setDefaultValues(rtype);
          }
          this.params = {
            'effective_till': this.usersData.effective_till
          }
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  };

  setDefaultValues(rtype){
    // set form with default values
    this.updateAccountFormGroup.patchValue({
      selectedCharSetEncoding:this.usersData.charsetEncoding,
      selectedDlrType : this.usersData.dlrType,
      selectedCustomerType : this.usersData.intl_routetype,
      lcrOnly : this.usersData.lcrOnly,
      billplanName : this.usersData.billplan_name,
      selectedRouteType: rtype,
      process_row : this.usersData.process_row,
      lcrRouteType : this.lcrRouteType,
      primary_gwid : this.usersData.gwid_primary,
      fallback_gwid : this.usersData.gwid_fallback,
      selectedPoolRouteId : this.usersData.pool_route_id,
      selectedPoolRouteName : _.isUndefined(this.usersData.pool_route_name)?'':this.usersData.pool_route_name,
      selectedTzString: this.selectedTzString,
      comments: this.usersData.comments,
      notifysales: this.usersData.notifysales,
      notifyclient: this.usersData.notifyclient
    });
  };

  handleStatus(event: any) {
    if(event.target.checked){
      this.updateAccountFormGroup.controls['max_loss_per_sms'].enable({onlySelf:true});
    }else{
      this.updateAccountFormGroup.controls['max_loss_per_sms'].setValue('');
      this.updateAccountFormGroup.controls['max_loss_per_sms'].disable({onlySelf:true});
    }
    this.errorMessageProcessAtLoss = '';
  };

  getDateSelection(e) {
    // converting datetime to 24 hrs format
    let selectedDateTime = moment(e.value).utcOffset(environment.UTC).format(this.dateTimeFormat);
    this.effectiveTill = selectedDateTime;
  };

  setPoolRoute():void{
    let pool_name = this.updateAccountFormGroup.value.selectedPoolRouteName;
    console.log(`pool_name=${pool_name}`);
    if(!_.isUndefined(pool_name) && !_.isNull(pool_name) && !_.isEmpty(_.trim(pool_name))){
      if(_.size(this.poolRoutes) > 0){
        _.forEach(this.poolRoutes,(route)=>{
          if(_.isEqual(_.toLower(_.trim(route.route_name)),_.toLower(_.trim(pool_name)))){
            this.selectedPoolRouteId = route.id;
            this.selectedPoolRouteName = route.route_name;
            this.updateAccountFormGroup.get('selectedPoolRouteId').setValue(route.id);
            this.updateAccountFormGroup.get('selectedPoolRouteName').setValue(route.route_name);
          }
        });
      }
    }
  };

  
  set(changetype:string):void{
    if(_.isEqual(this.selectedRouteType,'pr')){
      this.selectedPoolRouteId = null;
      this.selectedPoolRouteName = null;
      this.updateAccountFormGroup.get('selectedPoolRouteId').setValue(null);
      this.setPoolRoute();
    }
    if(_.isEqual(_.toLower(changetype),'temp')){
      this.is_permanent = 0;
      this.updateAccountFormGroup.get('effectiveTill').setValue(this.effectiveTill);
      this.onSubmit(true);
    }else if(_.isEqual(_.toLower(changetype),'permanent')){
      this.is_permanent = 1;
      this.updateAccountFormGroup.get('effectiveTill').setValue('');
      this.onSubmit(true);
    }else if(_.isEqual(_.toLower(changetype),'showmargin')){
      let payload = {};
      let validationSuccess = this.validateAndconstructPayloadForSave(payload,false);
      if(validationSuccess){
        this.toggleShowMargin('showmargin');
      }
    }
    
  }

  onSubmit(isFormSubmit){
    let payload = {};
    let validationSuccess = this.validateAndconstructPayloadForSave(payload,isFormSubmit);
    if(validationSuccess){
      this.modalService.dismissAll();
      //console.log(`payload = ${JSON.stringify(payload)}`);
      this.customerManagementService.saveUserDetails(payload).subscribe(
        (res: ApiResponse_Generic) => {
          if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code){
            successAlert(res.message, res.responsestatus);
            this.router.navigate(['customer-management']);
          }else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
            errorAlert(res.message, res.responsestatus);
          }
        },(error: HttpErrorResponse) => {
          errorAlert(error.message, error.statusText);
        }
      );
    }else{
      if(this.effectiveTillError){

      }else{
        this.modalService.dismissAll();
      }
    }
  };

  errorMessage: string = '';
  routeTypeError: string = '';
  effectiveTillError: boolean = false;
  errorMessageProcessAtLoss: string = '';
  validateAndconstructPayloadForSave(payload, isFormSubmit):boolean{
    let json = this.updateAccountFormGroup.value;
    let validationSuccess = true;
    this.effectiveTillError = false;
    this.routeTypeError = '';

    payload['esmeaddr'] = this.esmeaddr;
    payload['loggedinempid'] = environment.loggedinempid;
    payload['loggedinusername'] = environment.loggedinusername;

    if(_.isUndefined(json.selectedCharSetEncoding) || _.isNull(json.selectedCharSetEncoding) || _.isEmpty(_.trim(json.selectedCharSetEncoding))){
      validationSuccess = false;
      this.errorMessage = 'Char.Set Encoding is required';
    }else{
      payload['charset_encoding'] = json.selectedCharSetEncoding;
    }

    if(_.isUndefined(json.selectedDlrType) || _.isNull(json.selectedDlrType) || _.isEmpty(_.trim(json.selectedDlrType))){
      validationSuccess = false;
      this.errorMessage = 'DLR Type is required';
    }else{
      payload['dlr_type'] = json.selectedDlrType;
    }
    
    if(_.isUndefined(json.selectedCustomerType) || _.isNull(json.selectedCustomerType) || _.isEmpty(_.trim(json.selectedCustomerType))){
      validationSuccess = false;
      this.errorMessage = 'Intl. Customer Type is required';
    }else{
      payload['intl_customer_type'] = json.selectedCustomerType;
    }

    if(_.isUndefined(json.lcrOnly) || _.isNull(json.lcrOnly) || _.isEmpty(_.trim(json.lcrOnly))){
      validationSuccess = false;
    }else{
      if(json.lcrOnly){
        payload['lcr_only'] = 1;
      }else{
        payload['lcr_only'] = 0;
      }
    }

    if(_.isUndefined(json.selectedRouteType) || _.isNull(json.selectedRouteType) || _.isEmpty(_.trim(json.selectedRouteType))){
      validationSuccess = false;
      this.routeTypeError = 'ROUTING is required';
    }else{
      payload['routing_type'] = this.routeTypeNodeMapping[json.selectedRouteType];
      payload['gateway_routing'] = {};
      payload['pool_routing'] = {};
      if(_.isEqual(json.selectedRouteType,'gt')){
        if(_.isUndefined(json.primary_gwid) || _.isNull(json.primary_gwid) || _.isEmpty(_.trim(json.primary_gwid))){
          validationSuccess = false;
          this.routeTypeError = 'Primary gateway is required';
        }else if(_.isUndefined(json.fallback_gwid) || _.isNull(json.fallback_gwid) || _.isEmpty(_.trim(json.fallback_gwid))){
          validationSuccess = false;
          this.routeTypeError = 'Fallback gateway is required';
        }else if(_.isEqual(_.toLower(_.trim(json.primary_gwid)),_.toLower(_.trim(json.fallback_gwid)))){
          validationSuccess = false;
          this.routeTypeError = 'Primary & Fallback gateways can not be same';
        }else{
          payload['gateway_routing'] = {
            "primary": _.trim(json.primary_gwid), "fallback": _.trim(json.fallback_gwid)
          };
        }
      }else if(_.isEqual(json.selectedRouteType,'pr')){
        if(_.isUndefined(json.selectedPoolRouteName) || _.isNull(json.selectedPoolRouteName) || _.isEmpty(_.trim(json.selectedPoolRouteName))){
          validationSuccess = false;
          this.routeTypeError = 'Pool route is required';
        }else if(_.isUndefined(json.selectedPoolRouteId) || _.isNull(json.selectedPoolRouteId) || _.isEmpty(_.trim(json.selectedPoolRouteId))){
          validationSuccess = false;
          this.routeTypeError = 'Pool route is not valid';
        }else {
          payload['pool_routing'] = {
            "id": _.trim(json.selectedPoolRouteId), "name": _.trim(json.selectedPoolRouteName)
          };
        }
      }else if(_.isEqual(json.selectedRouteType,'lcr')){

      }else{
        validationSuccess = false;
      }
    }

    if(_.isUndefined(json.process_row) || _.isNull(json.process_row)){
      payload['process_row'] = 0;
    }else{
      if(_.isBoolean(json.process_row)){
        payload['process_row'] = json.process_row?1:0;
      }else{
        payload['process_row'] = 0;
      }
    }

    if(_.isUndefined(json.process_at_loss) || _.isNull(json.process_at_loss)){
      payload['process_at_loss'] = 0;
      payload['max_loss_per_sms'] = null;
    }else{
      if(_.isBoolean(json.process_at_loss)){
        if(json.process_at_loss){
          payload['process_at_loss'] = 1;
          if(_.isUndefined(json.max_loss_per_sms) || _.isNull(json.max_loss_per_sms) || _.isEmpty(_.trim(json.max_loss_per_sms))){
            validationSuccess = false;
            this.errorMessageProcessAtLoss = 'Max loss per sms is required';
          }else{
            payload['max_loss_per_sms'] = json.max_loss_per_sms;
            this.errorMessageProcessAtLoss = '';
          }
        }else{
          payload['process_at_loss'] = 0;
          payload['max_loss_per_sms'] = null;
        }
      }else{
        payload['process_at_loss'] = 0;
        payload['max_loss_per_sms'] = null;
      }
    }

    
    if(_.isUndefined(this.selectedTimezone) || _.isNull(this.selectedTimezone) || _.isEmpty(_.trim(this.selectedTimezone))){
      validationSuccess = false;
      this.updateAccountFormGroup.controls['selectedTzString'].setValue('');
    }else{
      payload['timezone'] = this.selectedTimezone;
      payload['timezone_offset'] = this.selectedTimezoneOffset;
      payload['timezone_daylight'] = 0; // as of now DST not supported
    }

    if(isFormSubmit){
      if(this.is_permanent == 0){
        payload['is_permanent'] = 0;
        if(_.isUndefined(json.effectiveTill) || _.isNull(json.effectiveTill) || _.isEmpty(_.trim(json.effectiveTill))){
          validationSuccess = false;
          this.errorMessage = 'Effective till is required';
          this.effectiveTillError = true;
        }else{
          let effective_till = _.trim(json.effectiveTill);
          let effectiveDate = moment(effective_till, this.dateTimeFormat, true);
          if(effectiveDate.isValid()){
            payload['effective_till'] = effectiveDate.format('YYYY-MM-DD HH:mm:ss');
          }else{
            validationSuccess = false;
            this.errorMessage = 'Effective till is invalid';
          }
        }
      }else{
        payload['is_permanent'] = 1;
        payload['effective_till'] = null;
      }
    }
     
    payload['notify_sales'] = json.notifysales;
    payload['notify_client'] = json.notifyclient;
    payload['comments'] = json.comments;

    //console.log(`errorMessage = ${this.errorMessage}`);

    return validationSuccess;
  };

  marginPageInput:string = '';
  toggleShowMargin(div):void{
    if(!_.isUndefined(div) && !_.isNull(div) && _.isEqual(div,'showmargin')){
      let validationSuccess = true;
      let message = '';
      let queryParams = `loggedinempid=${environment.loggedinempid}&esmeaddr=${this.esmeaddr}`;
      let routingtype = this.routeTypeNodeMapping[this.updateAccountFormGroup.value.selectedRouteType];
      if(!_.isUndefined(routingtype) && !_.isNull(routingtype) && !_.isEmpty(_.trim(routingtype))){
        queryParams = `${queryParams}&route_type=${routingtype}`;
        if(_.isEqual(routingtype,'gateway')){
          let pgwid = this.updateAccountFormGroup.value.primary_gwid;
          let fgwid = this.updateAccountFormGroup.value.fallback_gwid;
          if(!_.isUndefined(pgwid) && !_.isNull(pgwid) && !_.isEmpty(_.trim(pgwid)) && !_.isUndefined(fgwid) && !_.isNull(fgwid) && !_.isEmpty(_.trim(fgwid))){
            queryParams = `${queryParams}&primary_gw_id=${pgwid}&fallback_gw_id=${fgwid}`;
          }else{
            validationSuccess = false;
            message = 'Please select primary & fallback gateways.';
          }
        }else if(_.isEqual(routingtype,'pool')){
          let pool_id = this.selectedPoolRouteId;
          if(!_.isUndefined(pool_id) && !_.isNull(pool_id) && !_.isEmpty(_.trim(pool_id))){
            queryParams = `${queryParams}&pool_id=${pool_id}`;
          }else{
            message = 'Please select pool route.';
            let pool_name = this.updateAccountFormGroup.value.selectedPoolRouteName;
            if(!_.isUndefined(pool_name) && !_.isNull(pool_name) && !_.isEmpty(_.trim(pool_name))){
              if(_.size(this.poolRoutes) > 0){
                _.forEach(this.poolRoutes,(route)=>{
                  if(_.isEqual(_.toLower(_.trim(route.route_name)),_.toLower(_.trim(pool_name)))){
                    this.selectedPoolRouteId = route.id;
                    this.selectedPoolRouteName = route.route_name;
                    this.updateAccountFormGroup.get('selectedPoolRouteName').setValue(route.route_name);
                    queryParams = `${queryParams}&pool_id=${route.id}`;
                  }
                });
              }else{
                validationSuccess = false;
              }
            }else{
              validationSuccess = false;
            }
          }
        }else if(_.isEqual(routingtype,'lcr')){

        }else{
            validationSuccess = false;
        }
      }else{
        validationSuccess = false;
      }

      if(validationSuccess){
        queryParams = `${queryParams}&intl_acc_type=${this.updateAccountFormGroup.value.selectedCustomerType}`;
        this.marginPageInput = queryParams;
        this.showMargin = true;
        this.showEditPage = false;
      }else{
        errorAlert(message, 'Failure');
      }      
    }else{
      this.showEditPage = true;
      this.showMargin = false;
    }

    
    if(this.updateAccountFormGroup.value.process_row || this.updateAccountFormGroup.value.process_row == 1){
      this.process_row = 1;
    }else{
      this.process_row = 0;
    }

    if(this.updateAccountFormGroup.value.process_at_loss || this.updateAccountFormGroup.value.process_at_loss == 1){
      this.process_at_loss = 1;
    }else{
      this.process_at_loss = 0;
    }

    if(this.updateAccountFormGroup.value.lcrOnly || this.updateAccountFormGroup.value.lcrOnly == 1){
      this.lcrOnly = 1;
    }else{
      this.lcrOnly = 0;
    }

    if(this.updateAccountFormGroup.value.notifysales || this.updateAccountFormGroup.value.notifysales == 1){
      this.updateAccountFormGroup.value.notifysales = 1;
    }else{
      this.updateAccountFormGroup.value.notifysales = 0;
    }

    if(this.updateAccountFormGroup.value.notifyclient || this.updateAccountFormGroup.value.notifyclient == 1){
      this.updateAccountFormGroup.value.notifyclient = 1;
    }else{
      this.updateAccountFormGroup.value.notifyclient = 0;
    }
  }

  onNotify(message:string):void {
    this.toggleShowMargin(message);
  }


}


