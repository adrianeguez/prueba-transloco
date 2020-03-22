import { EmpresaInterface } from '../../submodulo-empresa-front/interfaces/empresa.interface';
import { MenuComidaInterface } from './menu-comida.interface';

export interface MenuComidaEmpresaInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  habilitado?: 0 | 1;
  empresa?: EmpresaInterface | number;
  menuComida?: MenuComidaInterface | number;
}
