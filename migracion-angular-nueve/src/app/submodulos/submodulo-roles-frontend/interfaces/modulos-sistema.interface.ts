import {NombrePermisoInterface} from './nombre-permiso-interface';

export interface ModulosSistemaInterface {
  id?: number;
  nombreModulo?: string;
  nombresPermiso?: NombrePermisoInterface[];
  habilitado?: boolean;
}
