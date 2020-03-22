import { OpcionMenuInterface } from './opcion-menu.interface';

export interface TipoOpcionMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  habilitado?: 0 | 1;
  opcionesMenu?: OpcionMenuInterface[];
}
