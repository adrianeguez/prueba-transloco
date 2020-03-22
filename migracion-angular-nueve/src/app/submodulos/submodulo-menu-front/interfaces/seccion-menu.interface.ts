import { SubSeccionMenuInterface } from './sub-seccion-menu.interface';

export interface SeccionMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  descripcion?: string;
  habilitado?: 0 | 1;
  subSeccionMenus?: SubSeccionMenuInterface[];
}
