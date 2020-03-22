import {PreguntasPorPruebaInterface} from './preguntas-por-prueba.interface';
import {DiapositivaInterface} from '../../diapositiva/interfaces/diapositiva.interface';
import {ModuloCursoInterface} from '../../modulo-curso/interfaces/modulo-curso.interface';

export interface PruebaInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  nombre: string;
  habilitado: 0 | 1;
  tipo: string;
  tiempoMaximo: number | string;
  numeroIntentos: number;
  moduloCurso?: ModuloCursoInterface | number;
  diapositiva?: DiapositivaInterface | number;
  preguntasPorPrueba?: PreguntasPorPruebaInterface[];
}
