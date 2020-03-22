import { EmpresaInterface } from './empresa.interface';

export interface SubempresaInterface {
  id?: number;
  nivel?: number;
  empresaPadre?: EmpresaInterface | number | string;
  empresaHijo?: EmpresaInterface | number | string;
  habilitado?: number;
}
