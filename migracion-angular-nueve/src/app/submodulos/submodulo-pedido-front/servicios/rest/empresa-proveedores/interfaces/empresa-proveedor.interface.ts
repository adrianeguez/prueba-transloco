import {EmpresaInterface} from '../../../../../submodulo-empresa-front/interfaces/empresa.interface';

export interface EmpresaProveedorInterface {
  id?: number;
  calificacionTotal?: number;
  habilitado?: number | boolean;
  empresa?: EmpresaInterface;
  empresaProveedor?: EmpresaInterface;
}
