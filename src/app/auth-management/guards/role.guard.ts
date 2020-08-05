import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "src/app/service/auth/authorization.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data.expectedRole ;
    console.log(
      expectedRole,
      this.authService.authorizationState.role,
      "123456"
    );

    if (expectedRole.includes(this.authService.authorizationState.role)) {
      return true;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Un Authorized",
        text: `You are not authorized to access this page!!`,
      });
      return false;
    }
  }

  canActivateChild( route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole ;
    console.log(
      expectedRole,
      this.authService.authorizationState.role,
      "123456"
    );

    if (expectedRole.includes(this.authService.authorizationState.role)) {
      return true;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Un Authorized",
        text: `You are not authorized to access this page!!`,
      });
      return false;
    }
  }
}
