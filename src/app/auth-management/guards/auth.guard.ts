import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  private isAuthorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentSubjectData = this.isAuthorizedSubject.asObservable();

  constructor(private authService: AuthService, private router: Router) { }

  // canActivate() {
  //   console.log("canactivate");
  //   return this.canLoad();
  // }
  setAuthorizationSubject(state: boolean) {
    this.isAuthorizedSubject.next(state);
  }

  canLoad(): boolean {
    console.log('canload:' + this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      console.log('inside authmgmt');
      // this.router.navigate(['/authmgmt']);
    }
    return this.authService.isLoggedIn();
  }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      console.log('inside authmgmt');
      this.setAuthorizationSubject(false);
      // this.router.navigate(['/authmgmt']);
    } else if (this.authService.isLoggedIn()) {
      this.setAuthorizationSubject(true);
    }
    return this.authService.isLoggedIn();
  }
}
