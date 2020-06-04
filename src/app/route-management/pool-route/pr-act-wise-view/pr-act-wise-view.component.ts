import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PoolRouteService } from '../../services/RouteManagement/poolRoute/pool-route.service';
import { SelectedPoolRouteRes, SelectedPoolRoute } from '../../models/RouteManagement/PoolRoute/poolRoute';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pr-act-wise-view',
  templateUrl: './pr-act-wise-view.component.html',
  styleUrls: ['./pr-act-wise-view.component.css',
    '../pool-route.component.css']
})
export class PrActWiseViewComponent implements OnInit {

  SelectedPoolRouteInput: SelectedPoolRoute = new SelectedPoolRoute();
  listDataRes: SelectedPoolRouteRes;
  searchText: any;
  sortingName: string;
  isDesc: boolean;

  constructor(
    private route: ActivatedRoute,
    private poolRouteService: PoolRouteService
  ) { }

  ngOnInit() {
    this.SelectedPoolRouteInput.loggedinempid = environment.loggedinempid;
    this.route.params
      .subscribe(
        (params: Params) => {
          // tslint:disable-next-line: variable-name
          const route_id = +params.id;
          this.getRouteDetails(route_id);
        }
      );
  }
  /**
   * @param routeId consists of selected route id
   * @description gets the pool route details
   */
  private getRouteDetails(routeId: number) {
    this.poolRouteService.viewPoolRouteDetailsList({ ...this.SelectedPoolRouteInput, route_id: routeId }).subscribe(
      (res: SelectedPoolRouteRes) => {
        if (res.responsestatus === environment.APIStatus.success.text
          && res.responsecode > environment.APIStatus.success.code) {
          // console.log(res);
          this.listDataRes = res;
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
