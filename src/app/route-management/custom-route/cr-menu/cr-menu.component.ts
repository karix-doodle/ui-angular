import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../services/custom.service';
import { CustomSummaryData, CustomSummary } from '../../models/custom.model';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cr-menu',
  templateUrl: './cr-menu.component.html',
  styleUrls: ['./cr-menu.component.css']
})
export class CrMenuComponent implements OnInit {

  customSummaryData: CustomSummaryData;

  constructor(public customService: CustomService,public toastr:ToastrManager) { }

  ngOnInit() {
    this.getSummaryData();
  }

  getSummaryData() {
    this.customService.getCustomRouteSummary().subscribe((res: CustomSummary) => {
      if (res.responsestatus === 'success' && res.responsecode === 200) {
        this.customSummaryData = res.data;
      } 
    });
  }

}
