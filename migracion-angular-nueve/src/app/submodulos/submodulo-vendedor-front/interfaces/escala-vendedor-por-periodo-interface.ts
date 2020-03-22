import { EscalaVendedorInterface } from './escala-vendedor-interface';
import { PeriodosPorVendedorInterface } from './periodos-por-vendedor-interface';

export interface EscalaVendedorPorPeriodoInterface {
  id?: number;

  habilitado?: boolean | number;

  periodosPorVendedor?: PeriodosPorVendedorInterface | number | string;

  escalaVendedor?: EscalaVendedorInterface | number | string;
}
