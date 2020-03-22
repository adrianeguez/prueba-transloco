import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaContactoEmpresaComponent } from './tabla-contacto-empresa/tabla-contacto-empresa.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [TablaContactoEmpresaComponent],
  exports: [TablaContactoEmpresaComponent],
  imports: [CommonModule, TableModule],
})
export class TablaContactoEmpresaModule {}
