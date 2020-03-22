import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaArticuloEmpresaComponent } from './tabla-articulo-empresa/tabla-articulo-empresa.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [TablaArticuloEmpresaComponent],
  exports: [
    TablaArticuloEmpresaComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class TablaArticuloEmpresaModule { }
