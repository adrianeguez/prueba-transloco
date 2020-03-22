import { DescuentoMenuDetalleInterface } from './descuento-menu-detalle.interface';
import { MenuDetalleInterface } from './menu-detalle.interface';

export interface ItemFactorInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  factor?: number;
  habilitado?: 0 | 1;
  descuentoMenuDetalle?: DescuentoMenuDetalleInterface | number;
  menuDetalle?: MenuDetalleInterface | number;
}
