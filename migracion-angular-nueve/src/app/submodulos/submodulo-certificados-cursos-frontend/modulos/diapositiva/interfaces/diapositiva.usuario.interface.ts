import {DiapositivaInterface} from './diapositiva.interface';
import {ModuloCursoInterface} from '../../modulo-curso/interfaces/modulo-curso.interface';

export interface DiapositivaUsuarioInterface {
  id?: number;
  tiempoEmpleado?: number | string;
  fechaInicio?: string;
  fechaFinalizacion?: string;
  visto?: 0 | 1;
  tiempoValido?: 0 | 1;
  tiempoMinimo?: string | number;
  diapositiva?: number | DiapositivaInterface | any;
  moduloCurso?: number | ModuloCursoInterface;
  moduloUsuario?: number | DiapositivaInterface;
}
