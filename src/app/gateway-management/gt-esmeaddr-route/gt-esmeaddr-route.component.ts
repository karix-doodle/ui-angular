import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GatewayManagementService } from '../services/gateway-management.service';

@Component({
  selector: 'app-gt-esmeaddr-route',
  templateUrl: './gt-esmeaddr-route.component.html',
  styleUrls: ['./gt-esmeaddr-route.component.css']
})
export class GtESMEAddrRoutedComponent implements OnInit {

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
  }
}
