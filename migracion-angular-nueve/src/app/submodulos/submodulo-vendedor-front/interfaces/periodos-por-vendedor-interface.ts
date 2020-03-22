import { PeriodoVentaInterface } from './periodo-venta-interface';
import { CronogramaVendedorInterface } from './cronograma-vendedor-interface';
import { EscalaVendedorPorPeriodoInterface } from './escala-vendedor-por-periodo-interface';
import { VisitaInterface } from './visita-interface';
import { DatosVendedorInterface } from './datos-vendedor-interface';

export interface PeriodosPorVendedorInterface {
  id?: number;

  ventasTotales?: number;

  comisionTotal?: number;

  porcentajeComision?: number;

  valorComision?: number;

  habilitado?: boolean | number;

  totalCanjeado?: number;

  totalSaldoDisponible?: number;

  cantidadPeriodoVigencia?: number;

  vigenciaHasta?: Date;

  acumulado?: number;

  datosVendedor?: DatosVendedorInterface | number | string;

  periodoVenta?: PeriodoVentaInterface | number | string;

  escalaVendedorPorPeriodo?: EscalaVendedorPorPeriodoInterface[];

  visita?: VisitaInterface[];

  cronogramaVendedor?: CronogramaVendedorInterface[];
}
