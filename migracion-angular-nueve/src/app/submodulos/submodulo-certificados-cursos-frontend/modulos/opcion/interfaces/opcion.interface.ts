import {PreguntaInterface} from '../../pregunta/interfaces/pregunta.interface';

export interface OpcionInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  descripcion?: string;
  habilitado?: 0 | 1;
  esRespuesta: 0 | 1 | number;
  hizoCheck?: 0 | 1;
  pregunta: PreguntaInterface | number;
}
