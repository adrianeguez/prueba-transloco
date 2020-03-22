import {VentaCabeceraEntityInterface} from '../../venta-cabecera/interfaces/venta-cabecera-entity.interface';
import {DescuentoVentaEntityInterface} from '../../descuento-venta/interfaces/descuento-venta-entity.interface';
import {ArticuloPorEmpresaEntityInterface} from '../../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';
import {Column} from 'typeorm';

export interface VentaDetalleEntityInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  'codigo': string;
  'nombre': string;
  'idArticulo': number;
  'cantidad': number;
  'cantidadPromocion': number;
  'cantidadTotal': number;
  'cantidadPendiente': number;
  'cantidadEntregada': number;
  'cantidadDadaBaja': number;
  'valorUnitario': number;
  'cantidadPedida': number;
  'descuento': number;
  'descuentoPorcentual': number;
  'descuentosPorcentuales': number;
  'descuentoValor': number;
  'descuentoPromocion': number;
  'subtotal': number;
  'totalBruto': number;
  'totalDescuentos': number;
  'idArticuloEmpresa': number;
  ventaCabecera?: VentaCabeceraEntityInterface | number | string;
  descuentos?: DescuentoVentaEntityInterface[];
  // articuloPorEmpresa?: ArticuloPorEmpresaEntityInterface | number | string | any;
}
