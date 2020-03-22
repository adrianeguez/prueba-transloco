import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBuscarProveedorComponent } from './modal-buscar-proveedor/modal-buscar-proveedor.component';
import {TablaProveedoresModule} from '../../tablas/tabla-proveedores/tabla-proveedores.module';
import {FilterProveedorModule} from '../../filters/filter-proveedor/filter-proveedor.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalBuscarProveedorComponent],
  imports: [
    CommonModule,
    TablaProveedoresModule,
    FilterProveedorModule,
    MatDialogModule
  ],
  exports: [ModalBuscarProveedorComponent]
})
export class ModalBuscarProveedorModule { }
