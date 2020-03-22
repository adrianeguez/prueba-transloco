import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaEmpresasProveedoresComponent } from './tabla-empresas-proveedores/tabla-empresas-proveedores.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaEmpresasProveedoresComponent],
  imports: [CommonModule, TableModule],
  exports: [TablaEmpresasProveedoresComponent],
})
export class TablaEmpresasProveedoresModule {}
