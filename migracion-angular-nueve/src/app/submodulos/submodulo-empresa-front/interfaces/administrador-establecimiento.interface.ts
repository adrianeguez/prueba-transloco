import {EstablecimientoInterface} from './establecimiento.interface';
import {ContactoEmpresaInterface} from './contacto-empresa.interface';

export interface AdministradorEstablecimientoInterface {
  id?: number;

  gestionaPtoEmision?: boolean | number;

  habilitado?: boolean | number;

  nombreContacto?: string;

  documentoContacto?: string;

  establecimiento?: EstablecimientoInterface | number | string;

  contactoEmpresa?: ContactoEmpresaInterface | number | string;

}
