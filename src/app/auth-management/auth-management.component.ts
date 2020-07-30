import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth-management',
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.css']
})
export class AuthManagementComponent implements OnInit {
  accesstoken: string;
  refreshtoken: string;
  requestType: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.accesstoken = params.accesstoken;
      this.refreshtoken = params.refreshtoken;
      this.requestType = params.reqtype;
      if (this.accesstoken && this.refreshtoken) {
        this.authenticate(this.requestType);
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  authenticate(reqType) {
    // console.log(rt);
    this.authService.authenticateTokens({
      accesstoken: this.accesstoken,
      refreshtoken: this.refreshtoken,
      reqType: reqType === undefined ? null : reqType
    }).subscribe(success => {
      if (success) {
        if (this.requestType !== 'billplan') {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

}
