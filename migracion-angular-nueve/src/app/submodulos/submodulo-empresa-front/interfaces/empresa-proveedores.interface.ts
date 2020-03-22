import { EmpresaInterface } from './empresa.interface';

export interface EmpresaProveedoresInterface {
  id?: number;
  calificacionTotal?: number;
  habilitado?: number | boolean;
  empresa?: EmpresaInterface | number | string;
  empresaProveedor?: EmpresaInterface | number | string;
}
