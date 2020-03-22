import { DatosVendedorInterface } from './datos-vendedor-interface';

export interface TipoVendedorInterface {
  id?: number;

  empresa?: number | string;

  nombre?: string;

  codigo?: string;

  habilitado?: boolean | number;

  datosVendedor?: DatosVendedorInterface[];
}
