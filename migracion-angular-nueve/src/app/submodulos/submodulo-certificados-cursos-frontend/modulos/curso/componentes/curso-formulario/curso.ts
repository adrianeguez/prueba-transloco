import {ArticuloInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';

export class Curso {
  constructor(
    public articulo?: ArticuloInterface | number | string | any,
    public nombre?: string,
    public descripcion?: string,

) {
}
}

