import { TarifaInterface } from './tarifa.interface';

export interface TipoImpuestoInterface {
  id?: number;
  codigoSri?: string;
  codigo?: string;
  nombre?: string;
  siglas?: string;
  descripcion?: string;
  habilitado?: number | boolean;
  tarifa?: TarifaInterface[];
}
