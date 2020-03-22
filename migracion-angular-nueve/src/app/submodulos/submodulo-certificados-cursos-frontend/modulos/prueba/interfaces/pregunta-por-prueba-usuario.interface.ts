import {PruebaUsuarioInterface} from './prueba-usuario.interface';
import {PreguntaInterface} from '../../pregunta/interfaces/pregunta.interface';

export interface PreguntasPorPruebaUsuarioInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  correcto: 0 | 1;
  tiempoEmpleado?: number;
  pregunta: PreguntaInterface;
  pruebaUsuario: PruebaUsuarioInterface;
}
