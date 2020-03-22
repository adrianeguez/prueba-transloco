import { TipoVendedorInterface } from './tipo-vendedor-interface';
import { RutaClienteInterface } from './ruta-cliente-interface';
import { PeriodosPorVendedorInterface } from './periodos-por-vendedor-interface';

export interface DatosVendedorInterface {
  id?: number;

  nombreVendedor?: string;

  documento?: string;

  fechaIngreso?: Date;

  fechaSalida?: Date;

  habilitado?: boolean | number;

  tipoVendedor?: TipoVendedorInterface | any;

  rutaCliente?: RutaClienteInterface[];

  periodosPorVendedor?: PeriodosPorVendedorInterface[];
}
