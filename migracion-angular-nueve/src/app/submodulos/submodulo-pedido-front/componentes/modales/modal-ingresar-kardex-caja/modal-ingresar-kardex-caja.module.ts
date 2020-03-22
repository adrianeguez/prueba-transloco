import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalIngresarKardexCajaComponent} from './modal-ingresar-kardex-caja/modal-ingresar-kardex-caja.component';
import {MatDialogModule} from '@angular/material';
import {IngresarKardexCajaModule} from '../../formularios/formulario-ingresar-kardex-caja/ingresar-kardex-caja.module';
import {ManLabNgModule} from 'man-lab-ng';
import {CurrencyMaskModule} from 'ng2-currency-mask';

@NgModule({
  declarations: [
    ModalIngresarKardexCajaComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    IngresarKardexCajaModule,
    ManLabNgModule,
    CurrencyMaskModule
  ],
  exports: [
    ModalIngresarKardexCajaComponent,
  ]
})
export class ModalIngresarKardexCajaModule {
}
