import { PeriodosPorVendedorInterface } from './periodos-por-vendedor-interface';
import { RutaClienteInterface } from './ruta-cliente-interface';
import { LogroVisitaInterface } from './logro-visita-interface';

export interface VisitaInterface {
  id?: number;

  fecha?: Date;

  observacion?: string;

  horaEmpieza?: string;

  horaTermina?: string;

  periodosPorVendedor?: PeriodosPorVendedorInterface | number | string;

  rutaCliente?: RutaClienteInterface | number | string;

  logroVisita?: LogroVisitaInterface[];
}
