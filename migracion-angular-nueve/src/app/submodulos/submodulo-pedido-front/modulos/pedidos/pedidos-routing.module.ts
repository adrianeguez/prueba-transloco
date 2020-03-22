import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaRecepcionComprasComponent} from './rutas/ruta-recepcion-compras/ruta-recepcion-compras.component';
import {RutaRegistrarPedidoComponent} from './rutas/ruta-registrar-pedido/ruta-registrar-pedido.component';
import {RutaCrearPedidoComponent} from './rutas/ruta-crear-pedido/ruta-crear-pedido.component';
import {RutaCargarDatosComponent} from './rutas/ruta-cargar-datos/ruta-cargar-datos.component';
import {RutaListarPedidosComponent} from './rutas/ruta-listar-pedidos/ruta-listar-pedidos.component';
import {RutaDetallePedidoCompraComponent} from './rutas/ruta-detalle-pedido-compra/ruta-detalle-pedido-compra.component';
import {
  RutaDetallePedidoIngresoEgresoComponent
} from './rutas/ruta-detalle-pedido-ingreso-egreso/ruta-detalle-pedido-ingreso-egreso.component';
import {
  RutaDetallePedidoTransferenciaComponent
} from './rutas/ruta-detalle-pedido-transferencia/ruta-detalle-pedido-transferencia.component';
import {RutaVentaComponent} from '../../componentes/ruta-venta/componentes/ruta-venta/ruta-venta.component';

const routes: Routes = [
  {
    path: 'recepcion-compras',
    component: RutaRecepcionComprasComponent
  },
  {
    path: 'registrar-pedido',
    component: RutaRegistrarPedidoComponent
  },
  {
    path: 'gestion-crear-pedido',
    component: RutaCrearPedidoComponent
  },
  {
    path: 'gestion-listar-pedidos',
    component: RutaListarPedidosComponent
  },
  {
    path: 'cargar-datos',
    component: RutaCargarDatosComponent
  },
  {
    path: 'gestion-listar-pedidos/detalle-pedido-compra/:idPedido',
    component: RutaDetallePedidoCompraComponent
  },
  {
    path: 'gestion-listar-pedidos/detalle-pedido-ingreso-egreso/:idPedido',
    component: RutaDetallePedidoIngresoEgresoComponent
  },
  {
    path: 'gestion-listar-pedidos/detalle-pedido-transferencia/:idPedido',
    component: RutaDetallePedidoTransferenciaComponent
  },
  {
    path: 'venta',
    component: RutaVentaComponent
  },
  {
    path: '',
    redirectTo: 'recepcion-compras',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule {
}
