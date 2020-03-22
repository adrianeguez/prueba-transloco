import { ListaArticuloProveedorModule } from './../../listas-filtros/lista-articulo-proveedor/lista-articulo-proveedor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaArticuloProveedorComponent } from './modal-lista-articulo-proveedor/modal-lista-articulo-proveedor.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [ModalListaArticuloProveedorComponent],
  imports: [CommonModule, MatDialogModule, ListaArticuloProveedorModule],
  entryComponents: [ModalListaArticuloProveedorComponent],
  exports: [ModalListaArticuloProveedorComponent],
})
export class ModalListaArticuloProveedorModule {}
