import { DatosVendedorInterface } from './datos-vendedor-interface';
import { CronogramaVendedorInterface } from './cronograma-vendedor-interface';
import { RutaInterface } from './ruta-interface';
import { VisitaInterface } from './visita-interface';

export interface RutaClienteInterface {
  id?: number;

  ventasTotales?: number;

  comisionTotal?: number;

  datosVendedor?: DatosVendedorInterface | number | string;

  ruta?: RutaInterface | number | string;

  cronogramaVendedor?: CronogramaVendedorInterface[];

  visita?: VisitaInterface[];

  userId?: string;
}
