import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterEmpresaProveedorComponent } from './filter-empresa-proveedor/filter-empresa-proveedor.component';
import { FormsModule } from '@angular/forms';
import { SelectEstadoModule } from 'man-lab-ng';

@NgModule({
  declarations: [FilterEmpresaProveedorComponent],
  imports: [CommonModule, FormsModule, SelectEstadoModule],
  exports: [FilterEmpresaProveedorComponent],
})
export class FilterEmpresaProveedorModule {}
