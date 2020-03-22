import { EmpresaInterface } from '../../../interfaces/empresa.interface';

export interface EmpresaSubempresaInterface {
  id?: number;
  empresaActual?: EmpresaInterface;
  empresaPadre?: EmpresaInterface;
  empresasHijo?: EmpresaInterface[];
  habilitado?: number;
  nivel?: number;
}
