import {ModuloCursoInterface} from '../../modulo-curso/interfaces/modulo-curso.interface';

export interface TemaInterface {
  id?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  nombre: string;
  descripcion?: string;
  habilitado?: 0 | 1;
  urlAudio?: string;
  moduloCurso: ModuloCursoInterface | number;
}
