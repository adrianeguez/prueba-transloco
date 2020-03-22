import { EmpresaInterface } from './empresa.interface';
import { DatosUsuarioInterface } from './datos-usuario.interface';
import {TipoCargoInterface} from './tipo-cargo.interface';

export interface ContactoEmpresaInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  nombres?: string;
  apellidos?: string;
  observacion?: string;
  habilitado?: 0 | 1;
  esOperario?: 0 | 1;
  esAdminPtoEmi?: 0 | 1;
  empresa?: EmpresaInterface | number;
  datosUsuario?: DatosUsuarioInterface | number;
  tipoCargo?: TipoCargoInterface | number;
}
