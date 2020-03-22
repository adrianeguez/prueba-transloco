import {ModulosSistemaInterface} from './modulos-sistema.interface';

export interface NombrePermisoInterface {
  id?: number | string;
  nombre?: string;
  estado?: number | boolean;
  modulo?: ModulosSistemaInterface | number;
  createdAt?: Date;
  updatedAt?: Date;
}
