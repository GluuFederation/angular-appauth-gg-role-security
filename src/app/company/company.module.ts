import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {CompanyComponent} from './company.component';
import {CompanyRoutingModule} from './company-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyComponent
  ],
  providers: []
})
export class CompanyModule {

}
