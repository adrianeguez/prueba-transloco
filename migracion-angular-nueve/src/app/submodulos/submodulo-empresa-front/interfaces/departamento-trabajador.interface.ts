import { ContactoEmpresaInterface } from './contacto-empresa.interface';

export interface DepartamentoTrabajadorInterface {
  id?: number;

  descripcion?: string;

  habilitado?: number | boolean;

  departamentoEmpresa?: DepartamentoTrabajadorInterface | number | string;

  nivel?: number;

  contactoEmpresa?: ContactoEmpresaInterface | number | string;
}
