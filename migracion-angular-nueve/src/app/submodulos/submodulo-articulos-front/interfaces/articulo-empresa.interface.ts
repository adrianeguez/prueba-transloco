import { ArticuloInterface } from './articulo.interface';
import { EmpresaInterface } from '../../submodulo-empresa-front/interfaces/empresa.interface';
export interface ArticuloEmpresaInterface {
  id?: number;
  habilitado?: number | boolean;
  articulo?: ArticuloInterface | number | string;
  empresa?: EmpresaInterface | number | string;
}
