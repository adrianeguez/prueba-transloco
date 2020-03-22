import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { TableModule } from 'primeng/table';
import {
  ModalCrearEditarInformacionTributariaModule
} from '../../modales/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.module';
// tslint:disable-next-line:max-line-length
import {ModalCrearEditarInformacionTributariaComponent} from '../../modales/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [TablaClientesComponent],
  imports: [CommonModule, TableModule, ModalCrearEditarInformacionTributariaModule, MatDialogModule],
  exports: [TablaClientesComponent],
  entryComponents: [ModalCrearEditarInformacionTributariaComponent]
})
export class TablaClientesModule {}
