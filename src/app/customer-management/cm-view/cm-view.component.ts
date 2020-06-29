import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CustomerManagementService } from '../services/customer-management-view.service';
import { EsmeaddrApi_Response, EssmeddrRateCardList_ApiResponse } from '../models/customer-management.model';
import { environment } from 'src/environments/environment';
import { successAlert, errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cm-view',
  templateUrl: './cm-view.component.html',
  styleUrls: ['./cm-view.component.css']
})
export class CmViewComponent implements OnInit {
  esmeaddr: number
  esmeddrDetails: EsmeaddrApi_Response;
  rateCardList:EssmeddrRateCardList_ApiResponse;
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private route: ActivatedRoute,
    private service: CustomerManagementService)
  {
  this.esmeaddr = +this.route.snapshot.params.id
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
this.getEssdmrAddres();
this.getEssdmrRateCardlist();
  }



  getEssdmrAddres(){
    this.service.getEsmeaddrDetails(this.esmeaddr).subscribe( (res: EsmeaddrApi_Response) => {
      if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
         this.esmeddrDetails = res

      } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
         errorAlert( res.responsestatus)
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText)
    })
  }

  getEssdmrRateCardlist(){
    this.service.getEsmeaddrRateCardDetails(this.esmeaddr).subscribe( (res: EssmeddrRateCardList_ApiResponse) => {
      if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
         this.rateCardList = res

      } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
         errorAlert( res.responsestatus)
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText)
    })
  }

}
