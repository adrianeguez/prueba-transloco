import {NgModule} from '@angular/core';
import {MenuLateralComponent} from './menu-lateral.component';
import {MenuRestService} from '../../servicios/rest/menu.service';
import {MenuInterfazModule} from '../menu-interfaz/menu-interfaz.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    MenuLateralComponent
  ],
  imports: [
    MenuInterfazModule,
    CommonModule
  ],
  providers: [
    MenuRestService
  ],
  exports: [
    MenuLateralComponent
  ]
})
export class MenuLateralComponentModule {

}
