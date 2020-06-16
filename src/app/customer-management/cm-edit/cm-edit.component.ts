import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerManagementService } from '../services/customer-management.service';
import { UserActivation_ApiResponse, UserRoutingConfig } from '../models/customer-management.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import {
  errorAlert,
  successAlert,
} from "../../shared/sweet-alert/sweet-alert";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cm-edit',
  templateUrl: './cm-edit.component.html',
  styleUrls: ['./cm-edit.component.css']
})
export class CmEditComponent implements OnInit {

  apiResponse : UserActivation_ApiResponse;
  usersData: UserRoutingConfig;
  esmeaddr: string;
  process_row: any = 0;

  constructor(config: NgbModalConfig, private modalService: NgbModal,private customerManagementService: CustomerManagementService,private activeRoute: ActivatedRoute) 
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    let esmeaddr = this.activeRoute.snapshot.params.esmeaddr;
    this.getPendingUserDetails(esmeaddr);
  }
  private selectedLink: string="lcr";        
  
  setradio(e: string): void   
{  

      this.selectedLink = e;  
        
}  

  isSelected(name: string): boolean   
{  

      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
}  

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }


  getPendingUserDetails(esmeaddr) {
    this.esmeaddr = esmeaddr;
    this.customerManagementService.getPendingUserDetails(esmeaddr).subscribe(
      (res: UserActivation_ApiResponse) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.apiResponse = res;
          this.usersData = JSON.parse(JSON.stringify(this.apiResponse.data));
          this.process_row = this.usersData.process_row;
        } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
          errorAlert(res.message, res.responsestatus)
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  };


  handleStatus() {
    
    
  };



}


