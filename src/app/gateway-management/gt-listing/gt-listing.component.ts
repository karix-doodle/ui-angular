import { Component, OnInit } from '@angular/core';
import { GatewayManagementService } from '../services/gateway-management.service';
import { TableDataList, ApiResponse, ListData } from '../models/gateway-management.model';

@Component({
  selector: 'app-gt-listing',
  templateUrl: './gt-listing.component.html',
  styleUrls: ['./gt-listing.component.css']
})

export class GtListingComponent implements OnInit {
  gatewayDataRes: ApiResponse;
  gatewayData: ListData;
  selectedType: TableDataList[];
  searchText: any = '';
  tabledata: ListData;

  constructor(
    private gatewayManagementService: GatewayManagementService
  ) { }

  ngOnInit() {
    this.gatewayManagementService.getGatewayList().subscribe(
      (res: ApiResponse) => {
        if (res.responsestatus === 'success' && res.responsecode === 100) {
          this.gatewayDataRes = res;
          this.gatewayData = JSON.parse(JSON.stringify(this.gatewayDataRes));
        }
      }, error => {
        console.log(error);
      }
    );
  }

  selectType(type) {
    if (type === 'All') {
      this.gatewayData = JSON.parse(JSON.stringify(this.gatewayDataRes));
    } else {
      this.selectedType = this.gatewayDataRes.data.tabledata.filter(item => item.gw_type === type);
      this.gatewayData.data.tabledata = this.selectedType;
    }
  }

}
