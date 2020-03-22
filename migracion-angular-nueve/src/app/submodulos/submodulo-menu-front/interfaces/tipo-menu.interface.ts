import { TipoMenuDetalleInterface } from './tipo-menu-detalle.interface';

export interface TipoMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  habilitado?: 0 | 1;
  tipoDetalleMenus?: TipoMenuDetalleInterface[];
}
