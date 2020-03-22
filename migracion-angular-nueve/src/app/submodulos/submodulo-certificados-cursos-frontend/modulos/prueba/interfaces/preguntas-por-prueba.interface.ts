import {PreguntaInterface} from '../../pregunta/interfaces/pregunta.interface';
import {PruebaInterface} from './prueba.interface';

export interface PreguntasPorPruebaInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  habilitado: 0 | 1;
  pregunta?: PreguntaInterface;
  prueba?: PruebaInterface;
}
