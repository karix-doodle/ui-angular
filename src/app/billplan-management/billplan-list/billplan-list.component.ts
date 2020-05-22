import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-billplan-list',
  templateUrl: './billplan-list.component.html',
  styleUrls: ['./billplan-list.component.css']
})
export class BillplanListComponent implements OnInit {
  'billingType'="postpaid";

  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}
