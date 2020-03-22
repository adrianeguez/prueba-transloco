import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBuscarClienteComponent } from './modal-buscar-cliente/modal-buscar-cliente.component';
import { MatDialogModule } from '@angular/material';
import { FilterClienteModule } from '../../filters/filter-cliente/filter-cliente.module';
import { TablaClientesModule } from '../../tablas/tabla-clientes/tabla-clientes.module';

@NgModule({
  declarations: [ModalBuscarClienteComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FilterClienteModule,
    TablaClientesModule,
  ],
  exports: [ModalBuscarClienteComponent],
})
export class ModalBuscarClienteModule {}
