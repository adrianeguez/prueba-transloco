import { PeriodosPorVendedorInterface } from './periodos-por-vendedor-interface';
import { RutaClienteInterface } from './ruta-cliente-interface';

export interface CronogramaVendedorInterface {
  id?: number;

  orden?: string;

  fecha?: Date;

  lunes?: number;

  martes?: number;

  miercoles?: number;

  jueves?: number;

  viernes?: number;

  sabado?: number;

  domingo?: number;

  horaVisita?: Date;

  visitado?: number;

  periodosPorVendedor?: PeriodosPorVendedorInterface | number | string;

  rutaCliente?: RutaClienteInterface | number | string;
}
