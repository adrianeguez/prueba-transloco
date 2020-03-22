import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterClienteComponent } from './filter-cliente/filter-cliente.component';
import { FormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {ModalCrearEditarInformacionTributariaComponent} from '../../modales/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.component';
import {
  ModalCrearEditarInformacionTributariaModule
} from '../../modales/modal-crear-editar-informacion-tributaria/modal-crear-editar-informacion-tributaria.module';

@NgModule({
  declarations: [FilterClienteComponent],
  imports: [CommonModule, FormsModule],
  exports: [FilterClienteComponent, ModalCrearEditarInformacionTributariaModule],
  entryComponents: [ModalCrearEditarInformacionTributariaComponent]

})
export class FilterClienteModule {}
