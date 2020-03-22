import {CursoInterface} from '../../curso/interfaces/curso.interface';

export interface ModuloCursoInterface {
  id?: number;
  nombre: string;
  descripcion: string;
  tiempo?: string;
  estado?: string;
  fechaFinalizacionModulo?: string;
  progreso?: number;
  urlCaratula: string;
  curso: CursoInterface | number;
  habilitado?: number;
  diapositivasTotales?: number;
  pruebasTotales?: number;
}
