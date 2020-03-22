import { MenuDetalleInterface } from './menu-detalle.interface';
import { MenuComidaEmpresaInterface } from './menu-comida-empresa.interface';

export interface MenuComidaInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  habilitado?: 0 | 1;
  menuDetalles?: MenuDetalleInterface[];
  menusComidaEmpresa?: MenuComidaEmpresaInterface[];
}
