import {DiapositivaInterface} from '../../diapositiva/interfaces/diapositiva.interface';

export interface ContenidoInterface {
  id?: number;
  texto?: string;
  urlImagen1?: string;
  urlImagen2?: string;
  link?: string;
  habilitado?: 0 | 1;
  diapositiva?: DiapositivaInterface | number;
}
