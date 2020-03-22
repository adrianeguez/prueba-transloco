import { EdificioInterface } from './edificio.interface';
import { ContactoEmpresaInterface } from './contacto-empresa.interface';

export interface BodegaInterface {
  id?: number;

  nombre?: string;

  codigo?: string;

  direccion?: string;

  habilitado?: number | boolean;

  esPercha?: number | boolean;

  edificio?: EdificioInterface | number | string;

  contactoEmpresa?: ContactoEmpresaInterface | number | string;
}
