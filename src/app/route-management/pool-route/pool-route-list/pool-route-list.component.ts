import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { PoolRouteListRes, TaggedAccountsList, PoolRouteRes, RoutesRowlist } from '../../models/RouteManagement/PoolRoute/poolRoute';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { errorAlert, confirmAlert } from '../../../shared/sweet-alert/sweet-alert';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';
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
    private poolRouteService: PoolRouteService,
    private authorizationService: AuthorizationService
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
          errorAlert(res.message, res.responsestatus);
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      }
    );
  }
  /**
   * @param routeId consists of route id
   * @param routeId consists of route name
   * @description gets the pool route list
   */
  onDelete(routeId, routeName) {
    confirmAlert(`You won't be able to revert ${routeName}!`)
      .then((result) => {
        if (result.isConfirmed) {
          this.poolRouteService.deletePoolRoute({ loggedinempid: environment.loggedinempid, route_id: routeId })
            .subscribe((res: PoolRouteRes) => {
              if (res.responsestatus === environment.APIStatus.success.text
                && res.responsecode > environment.APIStatus.success.code) {
                this.poolListRes.data.routes_list = this.poolListRes.data.routes_list
                  .filter((element) => element.route_id !== routeId);
              } else if (
                res.responsestatus === environment.APIStatus.error.text
                && res.responsecode < environment.APIStatus.error.code
              ) {
                errorAlert(res.message, res.responsestatus);
              }
            }, (error: HttpErrorResponse) => {
              errorAlert(error.message, error.statusText);
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
