import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalIngresarCabeceraMovimientoTransferenciasComponent
} from './modal-ingresar-cabecera-movimiento-transferencias/modal-ingresar-cabecera-movimiento-transferencias.component';
import { TransferenciaModule } from '../../transferencia/transferencia.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalIngresarCabeceraMovimientoTransferenciasComponent],
  imports: [CommonModule, TransferenciaModule, MatDialogModule],
  exports: [ModalIngresarCabeceraMovimientoTransferenciasComponent],
})
export class ModalIngresarCabeceraMovimientoTransferenciasModule {}
