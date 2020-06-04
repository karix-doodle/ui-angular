import { Component, OnInit } from '@angular/core';
import { MobileCustomRouteService } from 'src/app/route-management/services/custom-route/mobile-custom-route.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomService } from 'src/app/route-management/services/custom-route/custom.service';
import { NgForm } from '@angular/forms';
import { CustomGateway_ApiResponse, CustomGateway_Data, MobileCustomResponse } from 'src/app/route-management/models/custom.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mobile-route',
  templateUrl: './mobile-route.component.html',
  styleUrls: ['./mobile-route.component.css'],
})
export class MobileRouteComponent implements OnInit {
  whitelist_type: string;
  accounts: string[] = ['Global', 'Account'];

  mobileRouteForm: NgForm;
  fallback_gw_id: any;
  primary_gw_id: any;
  mobile: any;
  esmeaddr: any;
  comments: any;
formData: FormData = new FormData();
  cMobileUpload: any;
selectedFile: File;
  fileData: FormData;
  gatewayListApiResponse: CustomGateway_ApiResponse;
  gatewayListData: CustomGateway_Data;
  constructor(
    public router: Router,
    public customService: CustomService,
    public toastr: ToastrManager,
    public mobileCustomService: MobileCustomRouteService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.whitelist_type = this.accounts[0];
    this.getGatewayList();
  }

  /**
   * @description gets the gateway list
   */
  getGatewayList() {
    this.customService.getCustomRouteGateways().subscribe((res: CustomGateway_ApiResponse) => {
      console.log(res);
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.gatewayListApiResponse = res;
        this.gatewayListData = JSON.parse(JSON.stringify(this.gatewayListApiResponse.data));
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

  /**
   * @description navigates back to list page
   */
  cancel() {
    this.router.navigate(['../mobile'], { relativeTo: this.route });
  }

  /**
   *
   * @param esmeaddr ESME Address
   * @description checks the esme address
   */
  checkEsmeAddress(esmeaddr) {
    if (esmeaddr.length >= 4) {
      console.log(esmeaddr);
    }
  }

  /**
   *
   * @param mobilerouteformdata consists of mobile route data
   * @description adds the mobile custom route
   */
  addMobileRoute(mobilerouteformdata) {
    if (mobilerouteformdata.valid) {
      mobilerouteformdata.value.esmeaddr = mobilerouteformdata.value.esmeaddr ? mobilerouteformdata.value.esmeaddr : 0;
      mobilerouteformdata.value.req_type = 'single_req';
      mobilerouteformdata.value.createdby = '1234';
      mobilerouteformdata.value.whitelist_type = this.whitelist_type.toLowerCase();
      this.mobileCustomService.addCustomMobile(mobilerouteformdata.value).subscribe((data: MobileCustomResponse) => {
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

  fileUpload(fileInput) {
    if (fileInput.target.files.length === 0) { return; }
    const file = fileInput.target.files[0];
    console.log(this.formData, file);
    this.cMobileUpload = file.name;
    this.formData.append('file', file, file.name);
    this.formData.append('req_type', 'fileupload');
    this.formData.append('whitelist_type', this.whitelist_type.toLowerCase());
    this.formData.append('createdby', '1234');
    this.mobileCustomService.addCustomMobile(this.formData).subscribe(data => {
      console.log(data);
    });
  }

onAddRoute() {
    this.mobileCustomService
      .addCustomMobile(this.mobileRouteForm.value)
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
    if (this.cMobileUpload) {
      console.log(this.formData, '123');
      this.mobileCustomService
        .addCustomMobile(this.formData)
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
          }
        });
    }
  }
}


