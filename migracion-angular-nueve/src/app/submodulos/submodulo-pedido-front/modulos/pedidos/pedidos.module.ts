import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PedidosRoutingModule} from './pedidos-routing.module';
import {ConfirmacionModule, ManLabNgBootstrapModule} from 'man-lab-ng';
import {RutaRecepcionComprasComponent} from './rutas/ruta-recepcion-compras/ruta-recepcion-compras.component';
import {DatosFacturaModule} from '../../componentes/datos-factura/datos-factura.module';
import {TipoMovimientoModule} from '../../componentes/tipo-movimiento/tipo-movimiento.module';
import {ProveedorModule} from '../../componentes/proveedor/proveedor.module';
import {InformacionImpuestosModule} from '../../componentes/informacion-impuestos/informacion-impuestos.module';
import {InformacionArticulosModule} from '../../componentes/informacion-articulos/informacion-articulos.module';
import {TablaNotasCreditoModule} from '../../componentes/tablas/tabla-notas-credito/tabla-notas-credito.module';
import {ModalListaMovimientoModule} from '../../componentes/modales/modal-lista-movimiento/modal-lista-movimiento.module';
import {ClientesModule} from '../../componentes/clientes/clientes.module';
import {NotaCreditoCompraModule} from '../../componentes/nota-credito-compra/nota-credito-compra.module';
import {NotaCreditoVentaModule} from '../../componentes/nota-credito-venta/nota-credito-venta.module';
import {RutaRegistrarPedidoComponent} from './rutas/ruta-registrar-pedido/ruta-registrar-pedido.component';
import {StockArticuloModule} from '../../componentes/stock-articulo/stock-articulo.module';
import {
  ModalListaMovimientoComponent
} from '../../componentes/modales/modal-lista-movimiento/modal-lista-movimiento/modal-lista-movimiento.component';
import {RutaCrearPedidoComponent} from './rutas/ruta-crear-pedido/ruta-crear-pedido.component';
import {BuscarClienteProveedorModule} from '../../componentes/buscar-cliente-proveedor/buscar-cliente-proveedor.module';
import {
  ModalBuscarClienteComponent
} from '../../componentes/modales/modal-buscar-cliente/modal-buscar-cliente/modal-buscar-cliente.component';
import {CompraModule} from '../../componentes/compra/compra.module';
import {
  ModalIngresarCabeceraMovimientoComprasComponent
  // tslint:disable-next-line: max-line-length
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-compras/modal-ingresar-cabecera-movimiento-compras/modal-ingresar-cabecera-movimiento-compras.component';
import {
  ModalIngresarCabeceraMovimientoComprasModule
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-compras/modal-ingresar-cabecera-movimiento-compras.module';
import {
  ModalIngresarCabeceraMovimientoClientesComponent
  // tslint:disable-next-line: max-line-length
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes.component';
import {
  ModalIngresarCabeceraMovimientoClientesModule
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-clientes/modal-ingresar-cabecera-movimiento-clientes.module';
import {
  ModalIngresarCabeceraMovimientoAjustesComponent
  // tslint:disable-next-line: max-line-length
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-ajustes/modal-ingresar-cabecera-movimiento-ajustes/modal-ingresar-cabecera-movimiento-ajustes.component';
import {
  ModalIngresarCabeceraMovimientoTransferenciasModule
  // tslint:disable-next-line: max-line-length
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-transferencias/modal-ingresar-cabecera-movimiento-transferencias.module';
import {
  ModalIngresarCabeceraMovimientoTransferenciasComponent
  // tslint:disable-next-line: max-line-length
} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-transferencias/modal-ingresar-cabecera-movimiento-transferencias/modal-ingresar-cabecera-movimiento-transferencias.component';
import {
  ModalListaBodegasModule
} from '../../../submodulo-empresa-front/componentes/modales/modal-lista-bodegas/modal-lista-bodegas.module';
import {
  ModalListaBodegasComponent
} from '../../../submodulo-empresa-front/componentes/modales/modal-lista-bodegas/modal-lista-bodegas/modal-lista-bodegas.component';
import {ModalDarBajaCantidadModule} from '../../componentes/modales/modal-dar-baja-cantidad/modal-dar-baja-cantidad.module';
import {
  ModalDarBajaCantidadComponent
} from '../../componentes/modales/modal-dar-baja-cantidad/modal-dar-baja-cantidad/modal-dar-baja-cantidad.component';
import {RutaCargarDatosComponent} from './rutas/ruta-cargar-datos/ruta-cargar-datos.component';
import {ModalEntregarCantidadModule} from '../../componentes/modales/modal-entregar-cantidad/modal-entregar-cantidad.module';
import {
  ModalEntregarCantidadComponent
} from '../../componentes/modales/modal-entregar-cantidad/modal-entregar-cantidad/modal-entregar-cantidad.component';
import {ArticulosModule} from '../../componentes/articulos/articulos.module';
import { RutaListarPedidosComponent } from './rutas/ruta-listar-pedidos/ruta-listar-pedidos.component';
import {SelectMovimientosModule} from '../../componentes/select-movimientos/select-movimientos.module';
import {TableModule} from 'primeng/table';
// tslint:disable-next-line:max-line-length
import {ModalIngresarCabeceraMovimientoAjustesModule} from '../../componentes/modales/modal-ingresar-cabecera-movimiento-ajustes/modal-ingresar-cabecera-movimiento-ajustes.module';
import {
  ModalBuscarProveedorComponent
} from '../../componentes/modales/modal-buscar-proveedor/modal-buscar-proveedor/modal-buscar-proveedor.component';
import {ModalBuscarProveedorModule} from '../../componentes/modales/modal-buscar-proveedor/modal-buscar-proveedor.module';
import {FormsModule} from '@angular/forms';
import {SelectEstadoPedidoModule} from '../../componentes/select-estado-pedido/select-estado-pedido.module';
import { RutaDetallePedidoCompraComponent } from './rutas/ruta-detalle-pedido-compra/ruta-detalle-pedido-compra.component';
import {ArticulosDetalleModule} from '../../componentes/articulos-detalle/articulos-detalle.module';
import {
  RutaDetallePedidoIngresoEgresoComponent
} from './rutas/ruta-detalle-pedido-ingreso-egreso/ruta-detalle-pedido-ingreso-egreso.component';
import {
  RutaDetallePedidoTransferenciaComponent
} from './rutas/ruta-detalle-pedido-transferencia/ruta-detalle-pedido-transferencia.component';
import {CardModule} from 'primeng/card';
import {FieldsetModule, TabViewModule} from 'primeng/primeng';
import {EstadoPedidoPipe} from '../../pipes/estado-pedido.pipe';
import {RutaVentaModule} from '../../componentes/ruta-venta/ruta-venta.module';
import {TipoSistemaModule} from '../../../submodulo-empresa-front/modulos/tipo-sistema/tipo-sistema.module';
import {TituloPantallaModule} from '../../../submodulo-front-comun/modulos/titulo-pantalla/titulo-pantalla.module';

@NgModule({
  declarations: [
    RutaRecepcionComprasComponent,
    RutaRegistrarPedidoComponent,
    RutaCrearPedidoComponent,
    RutaCargarDatosComponent,
    RutaListarPedidosComponent,
    RutaDetallePedidoCompraComponent,
    RutaDetallePedidoIngresoEgresoComponent,
    RutaDetallePedidoTransferenciaComponent,
    EstadoPedidoPipe
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ManLabNgBootstrapModule,
    TipoMovimientoModule,
    DatosFacturaModule,
    ProveedorModule,
    InformacionImpuestosModule,
    InformacionArticulosModule,
    TablaNotasCreditoModule,
    ModalListaMovimientoModule,
    ClientesModule,
    NotaCreditoCompraModule,
    NotaCreditoVentaModule,
    StockArticuloModule,
    BuscarClienteProveedorModule,
    CompraModule,
    ModalIngresarCabeceraMovimientoComprasModule,
    ModalIngresarCabeceraMovimientoClientesModule,
    ModalIngresarCabeceraMovimientoAjustesModule,
    ModalIngresarCabeceraMovimientoTransferenciasModule,
    ModalListaBodegasModule,
    ModalDarBajaCantidadModule,
    ModalEntregarCantidadModule,
    ArticulosModule,
    SelectMovimientosModule,
    TableModule,
    ModalBuscarProveedorModule,
    FormsModule,
    SelectEstadoPedidoModule,
    ArticulosDetalleModule,
    CardModule,
    TabViewModule,
    FieldsetModule,
    RutaVentaModule,
    TipoSistemaModule,
    TituloPantallaModule,
    ConfirmacionModule
  ],
  exports: [
  ],
  entryComponents: [
    ModalListaMovimientoComponent,
    ModalBuscarClienteComponent,
    ModalIngresarCabeceraMovimientoComprasComponent,
    ModalIngresarCabeceraMovimientoClientesComponent,
    ModalIngresarCabeceraMovimientoAjustesComponent,
    ModalIngresarCabeceraMovimientoTransferenciasComponent,
    ModalListaBodegasComponent,
    ModalDarBajaCantidadComponent,
    ModalEntregarCantidadComponent,
    ModalBuscarProveedorComponent,
  ]
})

export class PedidosModule {
}
