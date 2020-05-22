import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rm-lcr',
  templateUrl: './rm-lcr.component.html',
  styleUrls: ['./rm-lcr.component.css']
})
export class RmLcrComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
    this.modalService.open(  content, 
      {
          windowClass: 'gt-detail-modal'
      });
  }

  ngOnInit() {
  }

}
