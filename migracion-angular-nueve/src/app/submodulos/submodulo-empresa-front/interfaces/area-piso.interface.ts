import { PisoInterface } from './piso.interface';
import { AreaTrabajadorInterface } from './area-trabajador.interface';

export interface AreaPisoInterface {
  id?: number;

  nombre?: string;

  descripcion?: string;

  nivel?: number;

  habilitado?: number | boolean;

  areaPisoHijos?: AreaPisoInterface[];

  areaPisoPadre?: AreaPisoInterface | number | string;

  areasTrabajador?: AreaTrabajadorInterface[];

  piso?: PisoInterface | number | string;
}
