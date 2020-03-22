import {EmpresaInterface} from '../../submodulo-empresa-front/interfaces/empresa.interface';
import {MovimientoInterface} from './movimiento.interface';

export interface EmpresaMovimientoInterface {
  id?: number;
  empresa?: EmpresaInterface;
  movimiento?: MovimientoInterface;
}
