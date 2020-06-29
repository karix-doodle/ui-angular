import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CustomerManagementService } from '../services/customer-management.service';
import { ApiResponse_Generic } from '../models/customer-management.model';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";

@Component({
  selector: 'app-cm-show-margin',
  templateUrl: './cm-show-margin.component.html',
  styleUrls: ['./cm-show-margin.component.css']
})
export class CmShowMarginComponent implements OnInit {
  pageData:any = {};
  tableData:any = [];
  intl_acc_type:string = '';
  routetype:string = '';
  gwidWiseCurrency:any = {};

  constructor(private customerManagementService: CustomerManagementService){}

  ngOnInit() {
  }
  //@Input('marginPageInput') marginPageInput: object;
  marginPageInputs:string;
  @Input('marginPageInput') set marginPageInput(inputs: string){
    //console.log(`inputs = ${inputs}`);
    this.marginPageInputs = inputs;
    let arr = _.split(inputs,'intl_acc_type=');
    if(_.size(arr)>1){
      this.intl_acc_type = _.trim(arr[1]);
    }

    if(inputs.includes('route_type=gateway')){
      this.routetype = 'Gateway';
    }else if(inputs.includes('route_type=pool')){
      this.routetype = 'Pool';
    }else{
      this.routetype = 'Lcr';
    }

    this.calculateMargins(this.marginPageInputs);
  }
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  calculateMargins(input){
    this.customerManagementService.calculateMarginalPrice(input).subscribe(
      (res: ApiResponse_Generic) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code){
            this.pageData = res.data;
            this.tableData = res.data.data;
            if(!_.isUndefined(res.data.data_row) && !_.isNull(res.data.data_row) && _.size(res.data.data_row) > 0){
              this.tableData = _.concat(this.tableData,res.data.data_row);
            }
            this.gwidWiseCurrency = res.data.currencies;
            //console.log(`Show margin page data = ${JSON.stringify(this.pageData)}`);
        }else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus);
        }
      },(error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
  

  onClick() {
    this.notify.emit('showedit');
  }

}
