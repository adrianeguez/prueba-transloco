import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaTipoImpuestoComponent } from './modal-lista-tipo-impuesto/modal-lista-tipo-impuesto.component';
import { FilterTipoImpuestoModule } from '../../componentes/filters/filter-tipo-impuesto/filter-tipo-impuesto.module';
import { TablaTipoImpuestoModule } from '../../componentes/tablas/tabla-tipo-impuesto/tabla-tipo-impuesto.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalListaTipoImpuestoComponent],
  imports: [
    CommonModule,
    FilterTipoImpuestoModule,
    TablaTipoImpuestoModule,
    MatDialogModule,
  ],
})
export class ModalListaTipoImpuestoModule {}
