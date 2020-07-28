import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';
import { CustomerMgmt } from '../../model/authorization.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cm-audit-log',
  templateUrl: './cm-audit-log.component.html',
  styleUrls: ['./cm-audit-log.component.css']
})
export class CmAuditLogComponent implements OnInit {
  CmAuthControls: CustomerMgmt;
  fromTabName: string;
  esmeAddress: number;
  constructor(
    private authorizationService: AuthorizationService,
    private activeRoute: ActivatedRoute
  ) {
    this.CmAuthControls = this.authorizationService.authorizationState.customer_management;
  }

  ngOnInit() {
    this.esmeAddress = +this.activeRoute.snapshot.params.esmeaddr;
    this.fromTabName = this.activeRoute.snapshot.params.from;
  }

}
