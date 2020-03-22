import {DiapositivaInterface} from './diapositiva.interface';
import {PruebaInterface} from '../../prueba/interfaces/prueba.interface';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

export interface DiapositivaFormateadaInterface {
  id?: number;
  anteriorDiapositiva?: DiapositivaInterface;
  siguienteDiapositiva?: DiapositivaInterface;
  titulo: string;
  notas?: string;
  urlAudio?: string;
  duracion?: string | number ;
  habilitado: 0 | 1;
  tipo: number;
  textos?: string[];
  imagenes?: string[];
  links?: string[];
  clase?: string;
  segundoEmpieza?: string | number;
  visto?: boolean;
  pruebas?: PruebaInterface[];
}

