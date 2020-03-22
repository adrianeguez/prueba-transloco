import { TablaArticuloProveedorModule } from './../../tablas/tabla-articulo-proveedor/tabla-articulo-proveedor.module';
import { FilterArticuloProveedorModule } from './../../filters/filter-articulo-proveedor/filter-articulo-proveedor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaArticuloProveedorComponent } from './lista-articulo-proveedor/lista-articulo-proveedor.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ListaArticuloProveedorComponent],
  imports: [
    CommonModule,
    TableModule,
    FilterArticuloProveedorModule,
    TablaArticuloProveedorModule,
  ],
  exports: [ListaArticuloProveedorComponent],
})
export class ListaArticuloProveedorModule {}
