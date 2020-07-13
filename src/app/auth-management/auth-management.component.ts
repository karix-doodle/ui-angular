import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-auth-management',
  templateUrl: './auth-management.component.html',
  styleUrls: ['./auth-management.component.css']
})
export class AuthManagementComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authGuard: AuthGuard) { }
  accesstoken: string;
  refreshtoken: string;

  ngOnInit() {
    console.log('welcome to authmanagement');

    this.route.queryParams.subscribe(params => {
      this.accesstoken = params.accesstoken;
      this.refreshtoken = params.refreshtoken;
      console.log(this.accesstoken);
      console.log(this.refreshtoken);
    });

    if (this.accesstoken && this.refreshtoken) {
      this.authenticate();
    }
    // else {
    //   console.log('set');
    //   setTimeout(() => {
    //     this.authGuard.setAuthorizationSubject(false);
    //   }, 1000);
    // }
  }

  authenticate() {
    this.authService.authenticateTokens({
      accesstoken: this.accesstoken,
      refreshtoken: this.refreshtoken
    })
      .subscribe(success => {
        if (success) {
          console.log(`response:${success}`);
          this.router.navigate(['/dashboard']);
        }
      });
  }

}