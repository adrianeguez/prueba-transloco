import { UnidadMedidaPorArticuloInterface } from './unidad-medida-por-articulo.interface';

export interface UnidadMedidaInterface {
  id?: number;
  unidadMedidaPorArticulo?: number | string | UnidadMedidaPorArticuloInterface;
  nombre?: string;
  abreviacion?: string;
  habilitado?: number | boolean;
}
