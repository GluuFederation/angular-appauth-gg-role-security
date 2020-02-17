import {NgModule} from '@angular/core';
import {ShowAuthedDirective} from './show-authed.directive';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  declarations: [ShowAuthedDirective],
  exports: [ShowAuthedDirective, CommonModule],
})
export class SharedModule {

}
