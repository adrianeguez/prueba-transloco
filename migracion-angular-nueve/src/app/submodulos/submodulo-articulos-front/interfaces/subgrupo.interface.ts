import { GrupoInterface } from './grupo.interface';

export interface SubgrupoInterface {
  id?: number;
  grupo?: GrupoInterface | number;
  nombre?: string;
  descripcion?: string;
  codigo?: number;
  codigoAuxiliar?: number;
  esProcesado?: number | boolean;
  habilitado?: number | boolean;
  empresaProductora?: number;
}
