import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TituloPantallaComponent} from './titulo-pantalla/titulo-pantalla.component';

@NgModule({
  declarations: [TituloPantallaComponent],
  imports: [
    CommonModule
  ],
  exports: [TituloPantallaComponent]
})
export class TituloPantallaModule {
}
