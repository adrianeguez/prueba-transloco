import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IngresarKardexCajaFormularioComponent} from './ingresar-kardex-caja-formulario.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    IngresarKardexCajaFormularioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    TextMaskModule
  ],
  exports: [
    IngresarKardexCajaFormularioComponent,
  ]
})
export class IngresarKardexCajaModule {
}
