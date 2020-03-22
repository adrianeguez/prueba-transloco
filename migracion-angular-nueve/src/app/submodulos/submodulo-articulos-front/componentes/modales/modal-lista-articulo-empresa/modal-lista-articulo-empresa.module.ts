import { ListaArticuloEmpresaModule } from './../../listas-filtros/lista-articulo-empresa/lista-articulo-empresa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaArticuloEmpresaComponent } from './modal-lista-articulo-empresa/modal-lista-articulo-empresa.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TablaArticuloEmpresaModule } from '../../tablas/tabla-articulo-empresa/tabla-articulo-empresa.module';

@NgModule({
  declarations: [ModalListaArticuloEmpresaComponent],
  imports: [CommonModule, MatDialogModule, ListaArticuloEmpresaModule],
  entryComponents: [ModalListaArticuloEmpresaComponent],
  exports: [ModalListaArticuloEmpresaComponent],
})
export class ModalListaArticuloEmpresaModule {}
