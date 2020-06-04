import { Component, OnInit } from '@angular/core';
import { MobileSenderidCustomService } from 'src/app/route-management/services/custom-route/mobile-custom-senderid.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CustomService } from 'src/app/route-management/services/custom-route/custom.service';
import { NgForm } from '@angular/forms';
import { CustomGateway_ApiResponse, CustomGateway_Data } from 'src/app/route-management/models/custom.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-senderid-mobile-route',
  templateUrl: './senderid-mobile-route.component.html',
  styleUrls: ['./senderid-mobile-route.component.css'],
})
export class SenderidMobileRouteComponent implements OnInit {
  whitelist_type: string;
  accounts: string[] = ['Global', 'Account'];

  cmobilesenderUpload: any;

  fallback_gw_id: any;
  primary_gw_id: any;
  mobile: any;
  esmeaddr: any;
  comments: any;
  senderid: any;

  senderIdFrom: NgForm;


selectedFile:File;
  form;
  gatewayListApiResponse: CustomGateway_ApiResponse;
  gatewayListData: CustomGateway_Data;
  constructor(
    public router: Router,
    public customService: CustomService,
    public toastr: ToastrManager,
    public mobileSenderIdCustomService: MobileSenderidCustomService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.whitelist_type = this.accounts[0];
    this.getGatewayList();
  }

  /**
   * @description navigates back to list page
   */
  cancel() {
    this.router.navigate(['../../mobile-sender-id'], { relativeTo: this.route });
    // this.router.navigate(['/custom-route/mobile-sender-id']);
  }

  /**
   * @description gets the gateway list
   */
  getGatewayList() {
    this.customService.getCustomRouteGateways().subscribe((res: any) => {
      console.log(res);
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.gatewayListApiResponse = res;
        this.gatewayListData = res.data;
      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        Swal.fire({
          icon: 'error',
          title: res.responsestatus,
          text: res.responsestatus,
        });
      }
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: error.statusText,
        text: error.message,
      });
    });
  }

  onSubmit(senderidMobileform) {

    if (this.form) {
      this.onAddRoute();
    } else if (senderidMobileform.valid) {
      senderidMobileform.value.esmeaddr = senderidMobileform.value.esmeaddr
        ? senderidMobileform.value.esmeaddr
        : 0;
      senderidMobileform.value.comments = senderidMobileform.value.comments
        ? senderidMobileform.value.comments
        : '';
      senderidMobileform.value.req_type = 'single_req';
      senderidMobileform.value.createdby = '1234';
      // const mobilesenderdata = { ...this.userData, ...senderidMobileform.value };
      this.senderIdFrom = senderidMobileform;
      this.onAddRoute();
    }
  }

  checkEsmeAddress(esmeaddr) {
    if (esmeaddr >= 4) {
      console.log(esmeaddr);
    }
  }

  fileUpload(fileInput) {
    if (fileInput.target.files.length === 0) {
      return;
    }
    this.selectedFile = fileInput.target.files[0];
    this.cmobilesenderUpload = this.selectedFile.name;
    const obj = {
      file: this.selectedFile,
      req_type: 'fileupload',
      whitelist_type: this.whitelist_type.toLowerCase(),
      createdby: '1234'
    }

    this.form = obj;
    // stores the image in the db
    // console.log(this.form, file);

    // this.form.append('file', file, file.name);
    // this.form.append('req_type', 'fileupload');
    // this.form.append('whitelist_type', this.whitelist_type.toLowerCase());
    // this.form.append('createdby', '1234');
    // console.log(this.form, '123');
  }

  onAddRoute() {
    const Data =  this.senderIdFrom && this.senderIdFrom.value ?  this.senderIdFrom.value : this.form;
    const formType = this.senderIdFrom && this.senderIdFrom.value ? false : true;
    console.log(Data, '123');
    this.mobileSenderIdCustomService
      .addCustomMobileSenderid(Data,formType)
      .subscribe((data: any) => {
        if (data.responsestatus === 'failure') {
          Swal.fire({
            icon: 'error',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            text: data.message,
          });
          this.cancel();
        }
      });
  }
}
