import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { PoolRouteListRes, TaggedAccountsList, PoolRouteRes, RoutesRowlist } from '../../models/RouteManagement/PoolRoute/poolRoute';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-pool-route-list',
  templateUrl: './pool-route-list.component.html',
  styleUrls: ['./pool-route-list.component.css',
    '../pool-route.component.css']
})
export class PoolRouteListComponent implements OnInit {

  poolListRes: PoolRouteListRes;
  searchText: any;
  sortingName: string;
  isDesc: boolean;
  headerName: string;
  isDeselect: boolean;
  popupSearchText: any;
  taggedAccountsList: TaggedAccountsList[] = [];
  createdBy: string;
  routeName: string;


  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private poolRouteService: PoolRouteService
  ) { }

  open(
    content,
    list: TaggedAccountsList[],
    createdby: string,
    name: string
  ) {
    this.createdBy = createdby;
    this.routeName = name;
    const accountsList = list;
    this.taggedAccountsList = JSON.parse(JSON.stringify(accountsList));
    this.modalService.open(content);
  }

  ngOnInit() {
    this.loadList();
    // this.isDesc = true;
    // this.isDeselect = true;
  }
  /**
   * @description gets the pool route list
   */
  loadList() {
    this.poolRouteService.getPoolRouteList().subscribe(
      (res: PoolRouteListRes) => {
        if (res.responsestatus === environment.APIStatus.success.text
          && res.responsecode > environment.APIStatus.success.code) {
          // console.log(res);
          this.poolListRes = res;
        } else if (
          res.responsestatus === environment.APIStatus.error.text
          && res.responsecode < environment.APIStatus.error.code
        ) {
          Swal.fire({
            icon: 'error',
            title: res.responsestatus,
            text: res.message,
          });
        }
      }, (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
      }
    );
  }

  onDelete(routeId, routeName) {
    // console.log(index);
    // console.log(list[index]);
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert ${routeName}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.poolRouteService.deletePoolRoute({ loggedinempid: environment.loggedinempid, route_id: routeId })
          .subscribe((res: PoolRouteRes) => {
            if (res.responsestatus === environment.APIStatus.success.text
              && res.responsecode > environment.APIStatus.success.code) {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: res.message
              });
              // this.poolListRes.data.routes_list.splice(index, 1);
              this.poolListRes.data.routes_list = this.poolListRes.data.routes_list
                .filter((element) => element.route_id !== routeId);
            } else if (
              res.responsestatus === environment.APIStatus.error.text
              && res.responsecode < environment.APIStatus.error.code
            ) {
              Swal.fire({
                icon: 'error',
                title: res.responsestatus,
                text: res.message,
              });
            }
          }, (error: HttpErrorResponse) => {
            Swal.fire({
              icon: 'error',
              text: error.message,
            });
          });
      }
    });
  }

  /**
   * @param tableHeaderName consists of table header
   * @param isNoOfAccountsTaggedPopup consists of boolean flag
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string, isNoOfAccountsTaggedPopup?: boolean): void {
    if (isNoOfAccountsTaggedPopup) {
      if (tableHeaderName && this.headerName !== tableHeaderName) {
        this.isDeselect = false;
      } else {
        this.isDeselect = !this.isDeselect;
      }
      this.headerName = tableHeaderName;
    } else {
      if (tableHeaderName && this.sortingName !== tableHeaderName) {
        this.isDesc = false;
      } else {
        this.isDesc = !this.isDesc;
      }
      this.sortingName = tableHeaderName;
    }
  }

}
