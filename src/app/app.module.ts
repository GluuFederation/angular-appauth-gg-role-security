import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {HeaderComponent, SharedModule} from './shared';
import {LoginModule} from './login/login.module';
import {CoreModule} from './core';
import {CompanyModule} from './company/company.module';
import {LogoutModule} from './logout/logout.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CompanyModule,
    LoginModule,
    CoreModule,
    SharedModule,
    LogoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
