import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDescuentosComponent } from './modal-descuentos/modal-descuentos.component';
import {
  IngresarDescuentoFacturaFormularioComponent
} from '../../formularios/ingresar-descuento-factura/ingresar-descuento-factura-formulario.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {TextMaskModule} from 'angular2-text-mask';
import {MatDialogModule} from '@angular/material/dialog';
import {CurrencyMaskModule} from 'ng2-currency-mask';

@NgModule({
  declarations: [
    ModalDescuentosComponent,
    IngresarDescuentoFacturaFormularioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManLabNgBootstrapModule,
    TextMaskModule,
    MatDialogModule,
    CurrencyMaskModule,
  ],
  entryComponents: [
    ModalDescuentosComponent,
  ],
  exports: [
    ModalDescuentosComponent,
  ]
})
export class ModalDescuentosModule { }
