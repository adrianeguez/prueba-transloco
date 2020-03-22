import { MenuDetalleInterface } from './menu-detalle.interface';
import { OpcionMenuInterface } from './opcion-menu.interface';

export interface ImagenMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  descripcion?: string;
  habilitado?: 0 | 1;
  tipo?: 'A' | 'L' | 'C';
  esPrincipal?: 0 | 1;
  esBanner?: 0 | 1;
  opcionMenu?: OpcionMenuInterface | number;
  menuDetalle?: MenuDetalleInterface | number;
}
