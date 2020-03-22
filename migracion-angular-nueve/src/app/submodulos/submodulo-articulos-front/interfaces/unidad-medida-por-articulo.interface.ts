import { ArticuloInterface } from './articulo.interface';
import { UnidadMedidaInterface } from './unidad-medida.interface';
export interface UnidadMedidaPorArticuloInterface {
  id?: number;
  esPrincipal?: number;
  articulo?: number | string | ArticuloInterface;
  unidadMedida?: number | string | UnidadMedidaInterface;
}
