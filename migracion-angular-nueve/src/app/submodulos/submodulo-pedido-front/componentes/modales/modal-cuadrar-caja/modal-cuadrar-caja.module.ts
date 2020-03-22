import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCuadrarCajaComponent} from './modal-cuadrar-caja/modal-cuadrar-caja.component';
import {ManLabNgModule} from 'man-lab-ng';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {MatDialogModule} from '@angular/material';
import {CuadrarCajaModule} from '../../formularios/formulario-cuadrar-caja/cuadrar-caja.module';

@NgModule({
  declarations: [
    ModalCuadrarCajaComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ManLabNgModule,
    CurrencyMaskModule,
    CuadrarCajaModule,
  ],
  exports: [
    ModalCuadrarCajaComponent,
  ]
})
export class ModalCuadrarCajaModule {
}
