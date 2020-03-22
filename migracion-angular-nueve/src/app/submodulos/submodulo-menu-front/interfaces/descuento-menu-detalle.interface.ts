import { OpcionMenuInterface } from './opcion-menu.interface';
import { MenuDetalleInterface } from './menu-detalle.interface';
import { CantidadMenuDetalleInterface } from './cantidad-menu-detalle.interface';
import { DescuentoMenuInterface } from './descuento-menu.interface';
import { ItemFactorInterface } from './item-factor.interface';

export interface DescuentoMenuDetalleInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  tipo?: 'P' | 'V' | 'C';
  valor?: number;
  cantidad?: number;
  habilitado?: 0 | 1;
  descuentoMenu?: DescuentoMenuInterface | number;
  opcionMenu?: OpcionMenuInterface | number;
  menuDetalle?: MenuDetalleInterface | number;
  itemsFactor?: ItemFactorInterface[];
  cantidadesMenuDetalle?: CantidadMenuDetalleInterface[];
}
