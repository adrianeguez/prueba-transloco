import {NgModule} from '@angular/core';
import {CabeceraCompraFormularioComponent} from './cabecera-compra-formulario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutoCompleteModule} from 'primeng/primeng';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [CabeceraCompraFormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TextMaskModule
  ],
  exports: [CabeceraCompraFormularioComponent]
})

export class FormularioCabeceraCompraModule {}
