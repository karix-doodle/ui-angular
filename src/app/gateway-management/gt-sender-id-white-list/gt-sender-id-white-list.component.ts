import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gt-sender-id-white-list',
  templateUrl: './gt-sender-id-white-list.component.html',
  styleUrls: ['./gt-sender-id-white-list.component.css']
})
export class GtSenderIdWhiteListComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}
