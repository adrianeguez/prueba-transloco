import { CabeceraCarritoInterface } from './cabecera-carrito.interface';
import { MenuDetalleInterface } from './menu-detalle.interface';
import { OpcionDetalleCarritoInterface } from './opcion-detalle-carrito.interface';

export interface DetalleCarritoInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  cantidadTotal?: number;
  precio?: number;
  habilitado?: 0 | 1;
  cantidadDescuento?: number;
  factor?: number;
  porcentajeDescuento?: number;
  cabeceraCarrito?: CabeceraCarritoInterface | number;
  menuDetalle?: MenuDetalleInterface | number;
  opcionesDetalleCarrito?: OpcionDetalleCarritoInterface[];
}
