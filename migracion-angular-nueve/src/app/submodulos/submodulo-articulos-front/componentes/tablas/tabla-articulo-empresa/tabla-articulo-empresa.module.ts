import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaArticuloEmpresaComponent } from './tabla-articulo-empresa/tabla-articulo-empresa.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaArticuloEmpresaComponent],
  imports: [CommonModule, TableModule],
  exports: [TablaArticuloEmpresaComponent],
})
export class TablaArticuloEmpresaModule {}
