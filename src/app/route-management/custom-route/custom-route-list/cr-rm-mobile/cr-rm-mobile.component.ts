import { Component, OnInit } from '@angular/core';
import { CustomService } from 'src/app/route-management/services/custom.service';
import { MobileCustom, MobileCustomList, MobileListData } from 'src/app/route-management/models/custom.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cr-rm-mobile',
  templateUrl: './cr-rm-mobile.component.html',
  styleUrls: ['./cr-rm-mobile.component.css']
})
export class CrRmMobileComponent implements OnInit {

  constructor(public customService: CustomService) { }

  sortingName: string;
  isDesc: boolean;

  mobileCustomData: MobileCustomList;

  ngOnInit() {
    this.getMobileCustomRoute();
  }

  /**
   * @description gets all the mobile custom route data
   */
  getMobileCustomRoute() {
    this.customService.getMobileCustomRoute().subscribe((res: MobileCustom) => {
      this.mobileCustomData = res.data;
    });
  }

  /**
   *
   * @param mobilerouteData consists of mobile custom data to delete
   * @description deletes the selected mobile custom route data
   */
  deleteMobileCustom(mobilerouteData: MobileListData) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

      }
    })
  }

  /**
   * 
   * @param tableHeaderName consists of table header
   * @description sorts the table based upon the table Header Name
   */
  sort(tableHeaderName: string): void {
    if (tableHeaderName && this.sortingName !== tableHeaderName) this.isDesc = false;
    else this.isDesc = !this.isDesc;
    this.sortingName = tableHeaderName;
  }
}
