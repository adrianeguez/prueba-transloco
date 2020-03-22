import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArticuloProveedorComponent } from './filter-articulo-proveedor/filter-articulo-proveedor.component';
import { FormsModule } from '@angular/forms';
import { SelectEstadoModule } from 'man-lab-ng';

@NgModule({
  declarations: [FilterArticuloProveedorComponent],
  imports: [CommonModule, FormsModule, SelectEstadoModule],
  exports: [FilterArticuloProveedorComponent],
})
export class FilterArticuloProveedorModule {}
