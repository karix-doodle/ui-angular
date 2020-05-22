import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gt-countrylist',
  templateUrl: './gt-countrylist.component.html',
  styleUrls: ['./gt-countrylist.component.css']
})
export class GtCountrylistComponent implements OnInit {
  sendTestMsg:any[]=[1,2,3];
  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}
  close(pop:any)
    {
      pop.close()
    }
    openPopup(pop:any)
    {
        pop.open()
    }
    open(content) {
      this.modalService.open(content);
    }

  ngOnInit() {
  }

}
