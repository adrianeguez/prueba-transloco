import {ContenidoInterface} from '../../contenido/interfaces/contenido.interface';
import {TemaInterface} from '../../tema/interfaces/tema.interface';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

export interface DiapositivaInterface {
  id?: number;
  anteriorDiapositiva?: DiapositivaInterface;
  siguienteDiapositiva?: DiapositivaInterface;
  titulo: string;
  notas?: string;
  urlAudio?: string;
  duracion?: string | number;
  segundoEmpieza?: string | number;
  habilitado: 0 | 1;
  tipo: number;
  contenidos?: ContenidoInterface[];
  tema?: TemaInterface | number;
  pruebas ?: [];
}
