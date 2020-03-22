import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalIngresarCabeceraMovimientoClientesComponent
} from './modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientesModule } from '../../clientes/clientes.module';

@NgModule({
  declarations: [ModalIngresarCabeceraMovimientoClientesComponent],
  imports: [CommonModule, MatDialogModule, ClientesModule],
  entryComponents: [ModalIngresarCabeceraMovimientoClientesComponent],
})
export class ModalIngresarCabeceraMovimientoClientesModule {}
