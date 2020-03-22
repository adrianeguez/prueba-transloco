import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalIngresarCabeceraMovimientoAjustesComponent
} from './modal-ingresar-cabecera-movimiento-ajustes/modal-ingresar-cabecera-movimiento-ajustes.component';
import { MatDialogModule } from '@angular/material';
import { AjustesModule } from '../../ajustes/ajustes.module';

@NgModule({
  declarations: [ModalIngresarCabeceraMovimientoAjustesComponent],
  imports: [CommonModule, MatDialogModule, AjustesModule],
  exports: [ModalIngresarCabeceraMovimientoAjustesComponent],
})
export class ModalIngresarCabeceraMovimientoAjustesModule {}
