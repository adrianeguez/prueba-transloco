import {EmpresaInterface} from '../../submodulo-empresa-front/interfaces/empresa.interface';

export interface RolInterface {
  id?: number | string;
  nombre?: string;
  estado?: boolean | number;
  empresa?: EmpresaInterface | number;
  createdAt?: Date;
  updatedAt?: Date;
}
