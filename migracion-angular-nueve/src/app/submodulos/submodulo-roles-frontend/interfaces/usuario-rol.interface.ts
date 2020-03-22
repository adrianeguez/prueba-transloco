import { RolInterface } from './rol-interface';
import {DatosUsuarioInterface} from '../../submodulo-empresa-front/interfaces/datos-usuario.interface';

export interface UsuarioRolInterface {
  usuario?: DatosUsuarioInterface | number;
  rol?: RolInterface | number;
  empresaId?: number;
}
