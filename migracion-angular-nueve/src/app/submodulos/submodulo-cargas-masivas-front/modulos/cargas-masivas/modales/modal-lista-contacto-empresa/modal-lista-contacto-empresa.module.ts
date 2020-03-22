import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalListaContactoEmpresaComponent } from './modal-lista-contacto-empresa/modal-lista-contacto-empresa.component';
import { FilterContactoEmpresaModule } from '../../componentes/filters/filter-contacto-empresa/filter-contacto-empresa.module';
import { TablaContactoEmpresaModule } from '../../componentes/tablas/tabla-contacto-empresa/tabla-contacto-empresa.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalListaContactoEmpresaComponent],
  imports: [
    CommonModule,
    FilterContactoEmpresaModule,
    TablaContactoEmpresaModule,
    MatDialogModule,
  ],
})
export class ModalListaContactoEmpresaModule {}
