import { EmpresaInterface } from './empresa.interface';
import { MovimientoInterface } from './movimiento.interface';

export interface TipoMovimientoInterface {
  id?: number;

  nombre?: string;

  habilitado?: number | boolean;

  empresa?: EmpresaInterface | number | string;

  movimientos?: MovimientoInterface[];
}
