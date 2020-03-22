import { ContactoEmpresaInterface } from './contacto-empresa.interface';
import { DatosContactoInterface } from './datos-contacto.interface';

export interface DatosUsuarioInterface {
  id?: number;

  nombres?: string;

  apellidos?: string;

  identificacionPais?: string;

  habilitadoAuth0?: number;

  contactosEmpresa?: ContactoEmpresaInterface[];

  datosContacto?: DatosContactoInterface[];

  user_id?: string;
}
