import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaEdificiosComponent } from './modal-lista-edificios/modal-lista-edificios.component';
import { FilterEdificioModule } from '../../componentes/filters/filter-edificio/filter-edificio.module';
import { TablaEdificioModule } from '../../componentes/tablas/tabla-edificio/tabla-edificio.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalListaEdificiosComponent],
  imports: [
    CommonModule,
    FilterEdificioModule,
    TablaEdificioModule,
    MatDialogModule,
  ],
})
export class ModalListaEdificiosModule {}
