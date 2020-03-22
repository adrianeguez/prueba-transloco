import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaBodegasComponent } from './modal-lista-bodegas/modal-lista-bodegas.component';
import { MatDialogModule } from '@angular/material/dialog';
import {FilterBodegaModule} from '../../../../../submodulo-empresa-front/componentes/filters/filter-bodega/filter-bodega.module';
import {TablaBodegasModule} from '../../../../../submodulo-empresa-front/componentes/tablas/tabla-bodegas/tabla-bodegas.module';

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
