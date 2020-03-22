import { LogroVisitaInterface } from './logro-visita-interface';

export interface TipoLogroVisitaInterface {
  id?: number;

  empresa?: number | string;

  nombre?: string;

  descripcion?: string;

  habilitado?: boolean | number;

  logroVisita?: LogroVisitaInterface[];
}
