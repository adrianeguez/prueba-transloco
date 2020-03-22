import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaArticuloProveedorComponent } from './tabla-articulo-proveedor/tabla-articulo-proveedor.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaArticuloProveedorComponent],
  imports: [CommonModule, TableModule],
  exports: [TablaArticuloProveedorComponent],
})
export class TablaArticuloProveedorModule {}
