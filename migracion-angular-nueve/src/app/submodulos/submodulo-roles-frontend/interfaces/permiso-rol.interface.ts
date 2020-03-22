import { MenuInterface } from './menu-interface';
import { RolInterface } from './rol-interface';
import { NombrePermisoInterface } from './nombre-permiso-interface';

export interface PermisoRolInterface {
  nombrePermiso: NombrePermisoInterface | number;
  rol: RolInterface | number;
}
