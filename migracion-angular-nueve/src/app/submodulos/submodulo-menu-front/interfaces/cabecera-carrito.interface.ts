import { EstablecimientoInterface } from '../../submodulo-empresa-front/interfaces/establecimiento.interface';
import { DetalleCarritoInterface } from './detalle-carrito.interface';

export interface CabeceraCarritoInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombre?: string;
  habilitado?: 0 | 1;
  esDelivery?: 0 | 1;
  esLocal?: 0 | 1;
  estado?: 'C' | 'EP' | 'PA' | 'R' | 'PR' | 'LD' | 'LL' | 'EN';
  establecimiento?: EstablecimientoInterface | number;
  detallesCarrito?: DetalleCarritoInterface[];
}
