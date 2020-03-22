import { MenuDetalleInterface } from './menu-detalle.interface';
import { TipoOpcionMenuInterface } from './tipo-opcion-menu.interface';
import { CantidadMenuDetalleInterface } from './cantidad-menu-detalle.interface';
import { ImagenMenuInterface } from './imagen-menu.interface';
import { CantidadOpcionMenuInterface } from './cantidad-opcion-menu.interface';
import { OpcionDetalleCarritoInterface } from './opcion-detalle-carrito.interface';
import { DescuentoMenuDetalleInterface } from './descuento-menu-detalle.interface';

export interface OpcionMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  descripcion?: string;
  habilitado?: 0 | 1;
  precio?: number;
  tipoOpcionMenu?: TipoOpcionMenuInterface | number;
  cantidadMenuDetalle?: CantidadMenuDetalleInterface | number;
  menuDetalle?: MenuDetalleInterface | number;
  cantidadesOpcionMenu?: CantidadOpcionMenuInterface[];
  descuentosMenuDetalle?: DescuentoMenuDetalleInterface[];
  imagenes?: ImagenMenuInterface[];
  opcionesDetalleCarrito?: OpcionDetalleCarritoInterface[];
}
