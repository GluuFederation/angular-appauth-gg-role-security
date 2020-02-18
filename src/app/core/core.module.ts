import {NgModule} from '@angular/core';
import {ApiService, AuthService, CompanyService} from './services';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from './interceptors';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    ApiService,
    CompanyService
  ]
})
export class CoreModule {}
