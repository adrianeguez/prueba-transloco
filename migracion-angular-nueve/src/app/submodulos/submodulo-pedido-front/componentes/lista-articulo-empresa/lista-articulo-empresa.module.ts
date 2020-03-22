import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaArticuloEmpresaComponent } from './lista-articulo-empresa/lista-articulo-empresa.component';
import {TablaArticuloEmpresaModule} from '../tablas/tabla-articulo-empresa/tabla-articulo-empresa.module';
import {FilterArticuloEmpresaModule} from '../filters/filter-articulo-empresa/filter-articulo-empresa.module';

@NgModule({
  declarations: [ListaArticuloEmpresaComponent],
  exports: [
    ListaArticuloEmpresaComponent
  ],
  imports: [
    CommonModule,
    TablaArticuloEmpresaModule,
    FilterArticuloEmpresaModule,
  ]
})
export class ListaArticuloEmpresaModule { }
