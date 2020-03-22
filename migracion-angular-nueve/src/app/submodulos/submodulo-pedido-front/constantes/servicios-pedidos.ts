import {MovimientoRestService} from '../servicios/rest/movimiento-rest.service';
import {TipoMovimientoRestService} from '../servicios/rest/tipo-movimiento-rest.service';
import {CompraCabeceraRestService} from '../servicios/rest/compra-cabecera/compra-cabecera-rest.service';
import {IngresoEgresoCabeceraRestService} from '../servicios/rest/ingreso-egreso-cabecera/ingreso-egreso-cabecera-rest.service';
import {TransferenciaCabeceraRestService} from '../servicios/rest/transferencia-cabecera/transferencia-cabecera-rest.service';
import {VentaCabeceraRestSqljsService} from '../servicios/rest/venta-cabecera/venta-cabecera-rest-sqljs.service';
import {PuntoEmisionOperarioRestService} from '../servicios/rest/punto-emision-operario-rest.service';
import {CajasService} from '../servicios/rest/cajas.service';
import {IngresoEgresoDetalleRestService} from '../servicios/rest/ingreso-egreso-detalle/ingreso-egreso-detalle-rest.service';
import {ArticuloPorBodegaRestService} from '../servicios/rest/articulo-por-bodega/articulo-por-bodega-rest.service';
import {TransferenciaDetalleRestService} from '../servicios/rest/transferencia-detalle/transferencia-detalle-rest.service';
import {CompraDetalleRestService} from '../servicios/rest/compra-detalle/compra-detalle-rest.service';
import {ArticuloPorEmpresaRestService} from '../servicios/rest/articulo-por-empresa/articulo-por-empresa-rest.service';
import {VentaCabeceraRestService} from '../servicios/rest/venta-cabecera/venta-cabecera-rest.service';
import {KardexCajaRestService} from '../servicios/rest/kardex-caja-rest.service';
import {StockArticuloService} from '../componentes/stock-articulo/servicios/stock-articulo.service';
import {MovimientoEmpresaRestService} from '../servicios/rest/movimiento-empresa-rest.service';

export const SERVICIOS_PEDIDOS = [
  MovimientoRestService,
  TipoMovimientoRestService,
  CompraCabeceraRestService,
  IngresoEgresoCabeceraRestService,
  TransferenciaCabeceraRestService,
  VentaCabeceraRestSqljsService,
  PuntoEmisionOperarioRestService,
  CajasService,
  IngresoEgresoDetalleRestService,
  ArticuloPorBodegaRestService,
  TransferenciaDetalleRestService,
  CompraDetalleRestService,
  ArticuloPorEmpresaRestService,
  VentaCabeceraRestService,
  KardexCajaRestService,
  StockArticuloService,
  MovimientoEmpresaRestService,
];
