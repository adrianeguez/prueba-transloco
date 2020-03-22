import { EmpresaInterface } from './empresa.interface';

export interface EmpresaClientesInterface {
  id?: number;
  calificacionTotal?: number;
  habilitado?: number | boolean;
  empresa?: EmpresaInterface | number | string;
  empresaCliente?: EmpresaInterface | number | string;
}
