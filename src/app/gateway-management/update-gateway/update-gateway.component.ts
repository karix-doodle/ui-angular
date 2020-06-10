import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayManagementService } from '../services/gateway-management.service';

@Component({
  selector: 'app-update-gateway',
  templateUrl: './update-gateway.component.html',
  styleUrls: ['./update-gateway.component.css']
})
export class UpdateGatewayComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private gatewayManagementService: GatewayManagementService
  ) { }

  ngOnInit() {
  }

}
