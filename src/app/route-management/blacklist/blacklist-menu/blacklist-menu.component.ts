import { Component, OnInit } from '@angular/core';
import { BlackListService } from '../../services/RouteManagement/blacklist/black-list.service';
import { BlackListSummary_ApiResponse, BlackListSummary_Data } from '../../models/BlackList/blacklist.model';
import { environment } from 'src/environments/environment';
import { errorAlert } from 'src/app/shared/sweet-alert/sweet-alert';
import { AuthorizationService } from '../../../service/auth/authorization.service';

@Component({
  selector: 'app-blacklist-menu',
  templateUrl: './blacklist-menu.component.html',
  styleUrls: ['./blacklist-menu.component.css']
})
export class BlacklistMenuComponent implements OnInit {
blackListSummaryApiResponse: BlackListSummary_ApiResponse;
blacklistSummary: BlackListSummary_Data;
  constructor(
    public blackListService: BlackListService,
    public authService: AuthorizationService
    ) { }

  ngOnInit() {
    this.getBlackListSummary()
  }
  /**
   *
   * @description gets the over all summary for the blacklist
   */


  getBlackListSummary(){
    this.blackListService.getBlackListSummary().subscribe((res: BlackListSummary_ApiResponse) => {
      // console.log(res);
      if (
        res.responsestatus === environment.APIStatus.success.text &&
        res.responsecode > environment.APIStatus.success.code
      ) {
        this.blackListSummaryApiResponse = res;
        this.blacklistSummary =JSON.parse(JSON.stringify(this.blackListSummaryApiResponse.data));
      } else if (
        res.responsestatus === environment.APIStatus.error.text &&
        res.responsecode < environment.APIStatus.error.code
      ) {
        errorAlert(res.responsestatus)
      }
    },
    (error) => {
      errorAlert(error.name, error.statusText);
    });
  }
}
