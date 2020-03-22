import { FilterArticuloEmpresaModule } from './../../filters/filter-articulo-empresa/filter-articulo-empresa.module';
import { TablaArticuloEmpresaModule } from './../../tablas/tabla-articulo-empresa/tabla-articulo-empresa.module';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaArticuloEmpresaComponent } from './lista-articulo-empresa/lista-articulo-empresa.component';

@NgModule({
  declarations: [ListaArticuloEmpresaComponent],
  imports: [
    CommonModule,
    TableModule,
    TablaArticuloEmpresaModule,
    FilterArticuloEmpresaModule,
  ],
  exports: [ListaArticuloEmpresaComponent],
})
export class ListaArticuloEmpresaModule {}
