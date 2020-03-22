import { EscalaVendedorPorPeriodoInterface } from './escala-vendedor-por-periodo-interface';

export interface EscalaVendedorInterface {
  id?: number;

  empresa?: number | string;

  maximo?: number;

  minimo?: number;

  nombre?: string;

  porcentajeIndividual?: number;

  porcentajeMultiple?: number;

  habilitado?: boolean | number;

  escalaVendedorPorPeriodo?: EscalaVendedorPorPeriodoInterface[];
}
