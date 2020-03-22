import { EmpresaInterface } from './empresa.interface';
import { ContactoEmpresaInterface } from './contacto-empresa.interface';

export interface TipoCargoInterface {
  id?: number;

  nombre?: string;

  codigo?: string;

  habilitado?: number | boolean;

  empresa?: EmpresaInterface | number | string;

  contactosEmpresa?: ContactoEmpresaInterface[];
}
