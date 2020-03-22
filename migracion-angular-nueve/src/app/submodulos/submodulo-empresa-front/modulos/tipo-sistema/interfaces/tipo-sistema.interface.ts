import {EmpresaInterface} from '../../../interfaces/empresa.interface';

export class TipoSistemaInterface {
  tipo?: string;
  valor?: string;
  empresa?: number | EmpresaInterface;
  id?: number;
}
