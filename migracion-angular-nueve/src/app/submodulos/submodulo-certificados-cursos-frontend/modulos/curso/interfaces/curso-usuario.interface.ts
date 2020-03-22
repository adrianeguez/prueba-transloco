import { CursoInterface } from './curso.interface';

export interface CursoUsuarioInterface {
  fechaInicio: string;
  fechaFin?: string;
  estado: string;
  moduloActual: number;
  progreso: number;
  curso?: number | CursoInterface;
}
