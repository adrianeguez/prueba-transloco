import { OpcionMenuInterface } from './opcion-menu.interface';

export interface CantidadOpcionMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  cantidad?: number;
  habilitado?: 0 | 1;
  opcionMenu?: OpcionMenuInterface | number;
}
