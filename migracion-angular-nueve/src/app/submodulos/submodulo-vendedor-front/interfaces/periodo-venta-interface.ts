import { PeriodosPorVendedorInterface } from './periodos-por-vendedor-interface';

export interface PeriodoVentaInterface {
  id?: number;

  empresa?: number | string;

  fechaInicio?: string;

  fechaFin?: string;

  descripcion?: string;

  nombre?: string;

  habilitado?: boolean | number;

  meta?: number;

  idPeriodoAnterior?: number;

  idPeriodoSiguiente?: number;

  periodosPorVendedor?: PeriodosPorVendedorInterface[];
}
