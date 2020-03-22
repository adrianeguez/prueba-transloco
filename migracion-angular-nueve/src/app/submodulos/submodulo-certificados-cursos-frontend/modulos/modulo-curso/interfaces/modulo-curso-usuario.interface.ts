import {ModuloCursoInterface} from './modulo-curso.interface';
import {CursoUsuarioInterface} from '../../curso/interfaces/curso-usuario.interface';
import {DatosUsuarioInterface} from '../../../../submodulo-roles-frontend/interfaces/datos-usuario.interface';

export interface ModuloCursoUsuarioInterface {
  id?: number;
  estado: string;
  fechaFinalizacionModulo: string;
  fechaInicio: string;
  diapositivaActual: number;
  progresoVisto: number;
  progresoTiempo: number;
  moduloCurso?: ModuloCursoInterface;
  progreso?: number;
  cursoUsuario?: CursoUsuarioInterface;
  datosUsuario?: DatosUsuarioInterface;
}
