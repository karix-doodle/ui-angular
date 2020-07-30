import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { AuthGuard } from './guards/auth.guard';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, public authGuard: AuthGuard) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // 401 Unauthorized access token.
        return this.handle401Error(request, next);
      } else if (error instanceof HttpErrorResponse && (error.status === 403 || error.status === 402)) {
        // 403 Access and Refresh token not found.
        // 402 Unauthorized Refresh token.
        this.authGuard.setIsUserAuthorizedState(false);
        return EMPTY;
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'x-access-token': `${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        // tap(t => {
        //   console.log(request.url);
        //   return t;
        // }),
        switchMap((token: any) => {
          // console.log(token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accesstoken);
          return next.handle(this.addToken(request, token.accesstoken));
        }));

    } else {
      // console.log('else block');
      return this.refreshTokenSubject.pipe(
        // tap(t => {
        //   console.log(request.url);
        //   return t;
        // }),
        filter(token => token != null),
        take(1),
        switchMap(accesstoken => {
          return next.handle(this.addToken(request, accesstoken));
        }));
    }
  }
}
