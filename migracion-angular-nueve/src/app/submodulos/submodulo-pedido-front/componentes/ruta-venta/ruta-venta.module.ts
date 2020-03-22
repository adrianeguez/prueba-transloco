import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RutaVentaComponent} from './componentes/ruta-venta/ruta-venta.component';
import {PedidosModule} from '../../modulos/pedidos/pedidos.module';
import {BuscarClienteProveedorModule} from '../buscar-cliente-proveedor/buscar-cliente-proveedor.module';
import {ArticulosModule} from '../articulos/articulos.module';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule, TabViewModule} from 'primeng/primeng';
import {ModalBuscarClienteComponent} from '../modales/modal-buscar-cliente/modal-buscar-cliente/modal-buscar-cliente.component';
import {ManLabNgBootstrapModule} from 'man-lab-ng';
import {RutaVentaRoutingModule} from './ruta-venta-routing.module';

@NgModule({
  declarations: [
    RutaVentaComponent,
  ],
  imports: [
    CommonModule,
    BuscarClienteProveedorModule,
    ArticulosModule,
    FieldsetModule,
    TabViewModule,
    CardModule,
    ManLabNgBootstrapModule,
    RutaVentaRoutingModule
  ],
  exports: [
    RutaVentaComponent
  ],
  entryComponents: [
    ModalBuscarClienteComponent,
  ]
})
export class RutaVentaModule { }
