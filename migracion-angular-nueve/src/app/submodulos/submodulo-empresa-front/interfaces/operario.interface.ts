import { PuntoEmisionInterface } from './punto-emision.interface';
import { ContactoEmpresaInterface } from './contacto-empresa.interface';

export interface OperarioInterface {
  id?: number;
  habilitado?: boolean | number;
  puntoEmision?: PuntoEmisionInterface | number | string | any;
  contactoEmpresa?: ContactoEmpresaInterface | number | string;
  nombreContacto?: string;
  documentoContacto?: string;
}
