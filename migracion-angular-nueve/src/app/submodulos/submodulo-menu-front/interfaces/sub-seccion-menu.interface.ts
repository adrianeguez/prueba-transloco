import { SeccionMenuInterface } from './seccion-menu.interface';
import { MenuDetalleInterface } from './menu-detalle.interface';

export interface SubSeccionMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  descripcion?: string;
  habilitado?: 0 | 1;
  seccionMenu?: SeccionMenuInterface | number;
  menuDetalles?: MenuDetalleInterface[];
}
