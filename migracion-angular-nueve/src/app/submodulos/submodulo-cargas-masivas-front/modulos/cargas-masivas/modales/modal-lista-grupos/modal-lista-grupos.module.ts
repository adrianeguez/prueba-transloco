import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaGruposComponent } from './modal-lista-grupos/modal-lista-grupos.component';
import { FilterGruposModule } from '../../componentes/filters/filter-grupos/filter-grupos.module';
import { TablaGruposModule } from '../../componentes/tablas/tabla-grupos/tabla-grupos.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalListaGruposComponent],
  imports: [
    CommonModule,
    FilterGruposModule,
    TablaGruposModule,
    MatDialogModule,
  ],
})
export class ModalListaGruposModule {}
