import { ArticuloInterface } from './articulo.interface';
export interface DetalleAdicionalInterface {
  id?: number;
  articulo?: number | string | ArticuloInterface;
  nombre?: string;
  valor?: number;
}
