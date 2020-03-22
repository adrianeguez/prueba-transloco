import { ContactoEmpresaInterface } from './contacto-empresa.interface';

export interface DatosContactoInterface {
  id?: number;

  telefono?: string;

  celular?: string;

  email?: string;

  fax?: string;

  habilitado?: number | boolean;

  esPrincipal?: number | boolean;

  contactoEmpresa?: ContactoEmpresaInterface | number | string;
}
