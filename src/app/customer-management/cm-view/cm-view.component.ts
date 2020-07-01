import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CustomerManagementService } from '../services/customer-management-view.service';
import { EsmeaddrApi_Response, EssmeddrRateCardList_ApiResponse, SenderIdsApi_Response, SenderIdLists, BlockedSenderIdsApi_Response, BlockedSenderIdLists, AssignedServiceApi_Response } from '../models/customer-management.model';
import { environment } from '../../../environments/environment';
import { successAlert, errorAlert } from '../../shared/sweet-alert/sweet-alert';
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
  senderidLis:SenderIdLists[] = []
  blockedSenderidList:BlockedSenderIdLists[]= []
  asignedService:AssignedServiceApi_Response
  samplearray: any = []


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
    this.samplearray = [
      {
        media: 'sms',
        svc:'global'
      },
      {
       media: 'voice',
       svc:'global2'
     },
     {
       media: 'voice',
       svc:'global1'
     },
     {
       media: 'sms',
       svc:'global'
     }
    ]
this.getEssdmrAddres();
this.getEssdmrRateCardlist();
this.getSenderidList();
this.getAssignedMediaList();
console.log(this.samplearray)
  }

  getAssignedMediaList(){
    this.service.getAssignedServiceDetails(this.esmeaddr).subscribe( (res: AssignedServiceApi_Response) => {
      if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
         this.asignedService = res

      } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
         errorAlert( res.responsestatus)
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText)
    })
  }




  getSenderidList(){
    this.service.getSenderidList(this.esmeaddr).subscribe( (res: SenderIdsApi_Response) => {
      if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
         this.senderidLis = res.data.senderidlists

      } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
         errorAlert( res.responsestatus)
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText)
    })
  }

  getBlockedSenderidList(){
    this.service.getBlockedSenderidList(this.esmeaddr).subscribe( (res: BlockedSenderIdsApi_Response) => {
      if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
         this.blockedSenderidList = res.data.blockedsenderidlists

      } else if (res.responsestatus === environment.APIStatus.error.text && res.responsecode < environment.APIStatus.error.code) {
         errorAlert( res.responsestatus)
      }
    }, (error: HttpErrorResponse) => {
      errorAlert(error.message, error.statusText)
    })
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
