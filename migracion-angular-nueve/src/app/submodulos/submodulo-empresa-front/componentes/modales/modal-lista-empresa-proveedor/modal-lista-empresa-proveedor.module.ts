import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaEmpresaProveedorComponent } from './modal-lista-empresa-proveedor/modal-lista-empresa-proveedor.component';
import { MatDialogModule } from '@angular/material';
import { FilterEmpresaProveedorModule } from '../../filters/filter-empresa-proveedor/filter-empresa-proveedor.module';
import { TablaEmpresasProveedoresModule } from '../../tablas/tabla-empresas-proveedores/tabla-empresas-proveedores.module';

@NgModule({
  declarations: [ModalListaEmpresaProveedorComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FilterEmpresaProveedorModule,
    TablaEmpresasProveedoresModule,
  ],
  exports: [ModalListaEmpresaProveedorComponent],
})
export class ModalListaEmpresaProveedorModule {}
