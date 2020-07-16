import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/auth/authorization.service';

@Component({
  selector: 'app-cm-audit-log',
  templateUrl: './cm-audit-log.component.html',
  styleUrls: ['./cm-audit-log.component.css']
})
export class CmAuditLogComponent implements OnInit {
  CmAuthControls = null

  constructor(
    private authorizationService: AuthorizationService
  ) {
    this.CmAuthControls = authorizationService.authorizationState.customer_management
  }

  ngOnInit() {
  }

}
