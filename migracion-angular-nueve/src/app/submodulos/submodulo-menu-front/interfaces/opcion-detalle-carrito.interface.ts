import { DetalleCarritoInterface } from './detalle-carrito.interface';
import { OpcionMenuInterface } from './opcion-menu.interface';

export interface OpcionDetalleCarritoInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  cantidadOpcion?: number;
  precio?: number;
  cantidadDescuento?: number;
  factor?: number;
  porcentajeDescuento?: number;
  habilitado?: 0 | 1;
  detalleCarrito?: DetalleCarritoInterface | number;
  opcionMenu?: OpcionMenuInterface | number;
}
