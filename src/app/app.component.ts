import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './service/auth/authorization.service';
import { AuthorizationStateData, AuthorizationState } from './model/authorization.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'erp-international';
  classApplied = false;
  state: AuthorizationStateData;
  stateBoolean: boolean;

  constructor(private authorizationService: AuthorizationService) {
    this.stateBoolean = false;
  }

  ngOnInit() {
    this.authorizationService.getAuthorizationState().subscribe(
      (res: AuthorizationState) => {
        if (res.responsestatus === environment.APIStatus.success.text && res.responsecode > environment.APIStatus.success.code) {
          this.stateBoolean = true;
          this.state = res.data;
        }
      }, error => {
        console.log(error);
      }
    );
  }
  toggleClass() {
    this.classApplied = !this.classApplied;
  }
}
