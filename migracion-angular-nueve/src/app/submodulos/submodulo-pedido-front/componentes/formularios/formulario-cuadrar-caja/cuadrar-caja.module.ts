import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {TextMaskModule} from 'angular2-text-mask';
import {CuadrarCajaFormularioComponent} from './cuadrar-caja-formulario.component';

@NgModule({
  declarations: [
    CuadrarCajaFormularioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    TextMaskModule
  ],
  exports: [
    CuadrarCajaFormularioComponent
  ]
})
export class CuadrarCajaModule {
}
