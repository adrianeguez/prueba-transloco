import { MenuDetalleInterface } from './menu-detalle.interface';
import { OpcionMenuInterface } from './opcion-menu.interface';
import { DescuentoMenuDetalleInterface } from './descuento-menu-detalle.interface';

export interface CantidadMenuDetalleInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  cantidad: number;
  habilitado?: 0 | 1;
  numeroOpciones?: number;
  descuentoMenuDetalle?: DescuentoMenuDetalleInterface | number;
  menuDetalle?: MenuDetalleInterface | number;
  opcionesMenu?: OpcionMenuInterface[];
}
