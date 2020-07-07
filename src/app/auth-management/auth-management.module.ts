import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthManagementComponent } from './auth-management.component';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { TokenInterceptor } from "./token.interceptor";


@NgModule({
  declarations: [AuthManagementComponent],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AuthManagementModule { }
