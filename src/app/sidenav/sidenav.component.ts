import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { MainPanel, AuthorizationState } from '../model/authorization.model';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { errorAlert } from '../shared/sweet-alert/sweet-alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;
  sideNavAuthControls: MainPanel;
  sub: Subscription;
  @Input() sideNavAuthDataObs: Observable<AuthorizationState>;
  dashBoardActive: boolean;
  gatewayMgmtActive: boolean;
  routeMgmtActive: boolean;
  topUrl = '';

  constructor(
    private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('/route-management/')) {
      this.isCollapsed = true;
    }
    this.topUrl = this.router.url;
    this.initSideNavAuthDataSubscribtion();
  }

  initSideNavAuthDataSubscribtion() {
    this.sub = this.sideNavAuthDataObs.subscribe(
      (authorizationServiceRes: AuthorizationState) => {
        if (authorizationServiceRes.responsestatus === environment.APIStatus.success.text &&
          authorizationServiceRes.responsecode > environment.APIStatus.success.code) {
          this.sideNavAuthControls = authorizationServiceRes.data.main_panel;
          this.topUrl = this.router.url;
        } else if (authorizationServiceRes.responsestatus === environment.APIStatus.error.text &&
          authorizationServiceRes.responsecode < environment.APIStatus.error.code) {
          errorAlert(authorizationServiceRes.message, authorizationServiceRes.responsestatus);
        }
      }, (error: HttpErrorResponse) => {
        errorAlert(error.message, error.statusText);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onRouterNavigate(URL) {
    this.topUrl = URL;
    this.router.navigate([URL]);
    if (URL === '/route-management') {
      this.isCollapsed = !this.isCollapsed;
    } else if (URL.includes('/route-management/')) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }

}
