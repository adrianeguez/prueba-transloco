import {PruebaInterface} from '../../prueba/interfaces/prueba.interface';
import {PreguntaInterface} from './pregunta.interface';

export interface PreguntaPorPruebaInterface {
  habilitado?: number;
  prueba?: PruebaInterface | number;
  pregunta?: PreguntaInterface | number;
  id?: number;
}
