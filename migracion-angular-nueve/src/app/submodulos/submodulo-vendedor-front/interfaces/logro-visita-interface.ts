import { VisitaInterface } from './visita-interface';
import { TipoLogroVisitaInterface } from './tipo-logro-visita-interface';

export interface LogroVisitaInterface {
  id?: number;

  razon?: string;

  habilitado?: boolean | number;

  visita?: VisitaInterface | number | string;

  tipoLogroVisita?: TipoLogroVisitaInterface | number | string;
}
