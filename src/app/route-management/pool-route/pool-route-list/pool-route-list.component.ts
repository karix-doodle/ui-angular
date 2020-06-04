import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { PoolRouteListRes } from '../../models/RouteManagement/PoolRoute/poolRoute';
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

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private poolRouteService: PoolRouteService
  ) { }

  open(content) {
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

  /**
   *
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = tableHeaderName;
  }

}
