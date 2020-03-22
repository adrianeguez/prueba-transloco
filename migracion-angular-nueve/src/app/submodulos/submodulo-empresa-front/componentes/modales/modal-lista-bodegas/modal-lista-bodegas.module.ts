import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaBodegasComponent } from './modal-lista-bodegas/modal-lista-bodegas.component';
import { MatDialogModule } from '@angular/material';
import { FilterBodegaModule } from '../../filters/filter-bodega/filter-bodega.module';
import { TablaBodegasModule } from '../../tablas/tabla-bodegas/tabla-bodegas.module';

@NgModule({
  declarations: [ModalListaBodegasComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FilterBodegaModule,
    TablaBodegasModule,
  ],
  exports: [ModalListaBodegasComponent],
})
export class ModalListaBodegasModule {}
