import { ArticuloInterface } from './articulo.interface';
export interface PreciosInterface {
  id?: number;
  valor?: number;
  valorIncentivo?: number;
  esPrincipal?: number | boolean;
  habilitado?: number | boolean;
  articulo?: ArticuloInterface | number | string;
}
