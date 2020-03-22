import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalIngresarCabeceraMovimientoComprasComponent
} from './modal-ingresar-cabecera-movimiento-compras/modal-ingresar-cabecera-movimiento-compras.component';
import { MatDialogModule } from '@angular/material';
import { CompraModule } from '../../compra/compra.module';
import {FormularioCabeceraCompraModule} from '../../formularios/formulario-cabecera-compra/formulario-cabecera-compra.module';
import {ManLabNgBootstrapModule} from 'man-lab-ng';

@NgModule({
  declarations: [ModalIngresarCabeceraMovimientoComprasComponent],
  imports: [CommonModule, MatDialogModule, CompraModule, FormularioCabeceraCompraModule, ManLabNgBootstrapModule],
  exports: [ModalIngresarCabeceraMovimientoComprasComponent],
})
export class ModalIngresarCabeceraMovimientoComprasModule {}
