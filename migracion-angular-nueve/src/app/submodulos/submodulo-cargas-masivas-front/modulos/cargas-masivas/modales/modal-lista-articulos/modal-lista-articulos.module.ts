import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaArticulosComponent } from './modal-lista-articulos/modal-lista-articulos.component';
import { MatDialogModule } from '@angular/material';
import { FilterArticulosModule } from '../../componentes/filters/filter-articulos/filter-articulos.module';
import { TablaArticulosModule } from '../../componentes/tablas/tabla-articulos/tabla-articulos.module';

@NgModule({
  declarations: [ModalListaArticulosComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FilterArticulosModule,
    TablaArticulosModule,
  ],
  exports: [ModalListaArticulosComponent],
})
export class ModalListaArticulosModule {}
