import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarClienteProveedorComponent } from './buscar-cliente-proveedor/buscar-cliente-proveedor.component';
import { ModalBuscarClienteModule } from '../modales/modal-buscar-cliente/modal-buscar-cliente.module';
import { ModalBuscarClienteComponent } from '../modales/modal-buscar-cliente/modal-buscar-cliente/modal-buscar-cliente.component';

@NgModule({
  declarations: [BuscarClienteProveedorComponent],
  imports: [CommonModule, ModalBuscarClienteModule],
  exports: [BuscarClienteProveedorComponent],
  entryComponents: [ModalBuscarClienteComponent],
})
export class BuscarClienteProveedorModule {}
