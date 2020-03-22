import { MenuDetalleInterface } from './menu-detalle.interface';
import { TipoMenuInterface } from './tipo-menu.interface';

export interface TipoMenuDetalleInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nivel?: number;
  menuDetalle?: MenuDetalleInterface | number;
  tipoMenu?: TipoMenuInterface | number;
  habilitado?: 1 | 0;
}
