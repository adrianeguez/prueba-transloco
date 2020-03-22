import {OpcionInterface} from '../../opcion/interfaces/opcion.interface';
import {DiapositivaInterface} from '../../diapositiva/interfaces/diapositiva.interface';

export interface PreguntaInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  descripcion: string;
  valor?: number;
  habilitado: 0 | 1;
  tratarDeNuevo: 0 | 1 | number;
  habilitarBotonTratar?: 0 | 1;
  opciones?: OpcionInterface[];
  diapositiva?: DiapositivaInterface | number;
}
