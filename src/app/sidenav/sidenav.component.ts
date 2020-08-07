import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../service/auth/authorization.service';
import { MainPanel } from '../model/authorization.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public isCollapsed = true;
  sideNavAuthControls: MainPanel;
  constructor(
    public authorizationService: AuthorizationService,
  ) {
    this.sideNavAuthControls = this.authorizationService.authorizationState.main_panel;
  }

  ngOnInit() {
  }

}
