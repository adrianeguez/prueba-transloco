import { RutaInterface } from './ruta-interface';

export interface LugarInterface {
  id?: number;

  nombre?: string;

  habilitado?: boolean | number;

  zonaHoraria?: number;

  lugarPadre?: LugarInterface | number | string;

  lugares?: LugarInterface[];

  ruta?: RutaInterface[];
}
