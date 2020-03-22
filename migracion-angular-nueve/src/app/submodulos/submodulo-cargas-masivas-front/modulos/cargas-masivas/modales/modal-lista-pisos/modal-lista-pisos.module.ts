import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaPisosComponent } from './modal-lista-pisos/modal-lista-pisos.component';
import { FilterPisosModule } from '../../componentes/filters/filter-pisos/filter-pisos.module';
import { TablaPisosModule } from '../../componentes/tablas/tabla-pisos/tabla-pisos.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalListaPisosComponent],
  imports: [CommonModule, FilterPisosModule, TablaPisosModule, MatDialogModule],
})
export class ModalListaPisosModule {}
