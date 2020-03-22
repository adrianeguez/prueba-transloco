import {HorarioServicioInterface} from '../../../../submodulo-empresa-front/modulos/horario-servicio/interfaces/horario-servicio.interface';
import {DatosUsuarioInterface} from '../../../../submodulo-roles-frontend/interfaces/datos-usuario.interface';

export interface PedidoCursoInterface {
  id?: number;
  fecha?: string;
  horarioServicio?: HorarioServicioInterface;
  datosUsuario?: DatosUsuarioInterface;
}
