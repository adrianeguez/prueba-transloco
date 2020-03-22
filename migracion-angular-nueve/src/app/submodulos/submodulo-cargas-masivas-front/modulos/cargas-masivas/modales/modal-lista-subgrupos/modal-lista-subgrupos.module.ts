import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaSubgruposComponent } from './modal-lista-subgrupos/modal-lista-subgrupos.component';
import { FilterSubgruposModule } from '../../componentes/filters/filter-subgrupos/filter-subgrupos.module';
import { TablaSubgruposModule } from '../../componentes/tablas/tabla-subgrupos/tabla-subgrupos.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalListaSubgruposComponent],
  imports: [
    CommonModule,
    FilterSubgruposModule,
    TablaSubgruposModule,
    MatDialogModule,
  ],
})
export class ModalListaSubgruposModule {}
