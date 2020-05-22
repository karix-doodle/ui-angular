import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.css']
})
export class GatewayDetailsComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) 
  {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }

}
