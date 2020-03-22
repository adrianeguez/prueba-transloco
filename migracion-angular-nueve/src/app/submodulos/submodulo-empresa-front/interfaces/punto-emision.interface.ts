import { EstablecimientoInterface } from './establecimiento.interface';
import { OperarioInterface } from './operario.interface';

export interface PuntoEmisionInterface {
  id?: number;
  nombre?: string;
  codigo?: string;
  secuencialActual?: string;
  habilitado?: boolean | number;
  enUso?: boolean | number;
  establecimiento?: EstablecimientoInterface | number | string;
  operarios?: OperarioInterface[];
}
