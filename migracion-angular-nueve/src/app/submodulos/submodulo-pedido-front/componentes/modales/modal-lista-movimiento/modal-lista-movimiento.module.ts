import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaMovimientoComponent } from './modal-lista-movimiento/modal-lista-movimiento.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TablaMovimientoModule } from '../../tablas/tabla-movimiento/tabla-movimiento.module';
import { FilterMovimientoModule } from '../../filters/filter-movimiento/filter-movimiento.module';

@NgModule({
  declarations: [ModalListaMovimientoComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TablaMovimientoModule,
    FilterMovimientoModule,
  ],
})
export class ModalListaMovimientoModule {}
