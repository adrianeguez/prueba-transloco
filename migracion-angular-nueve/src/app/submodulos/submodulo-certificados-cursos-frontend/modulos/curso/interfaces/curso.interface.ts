import {ArticuloInterface} from '../../../../submodulo-articulos-front/interfaces/articulo.interface';

export interface CursoInterface {
  id?: number;
  nombre: string;
  duracion: string;
  descripcion: string;
  articulo?: ArticuloInterface | number;
  habilitado?: number;
  diapositivasTotales?: number;
  pruebasTotales?: number;
}
