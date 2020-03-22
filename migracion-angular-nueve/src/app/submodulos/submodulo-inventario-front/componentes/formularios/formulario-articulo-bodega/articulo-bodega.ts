import {ArticuloEmpresaInterface} from '../../../../submodulo-articulos-front/interfaces/articulo-empresa.interface';

export class ArticuloBodega {
  constructor(
    public articuloEmpresa?: string | ArticuloEmpresaInterface,
    public minimo?: string,
    public maximo?: string,
    public minimoAlerta?: string,
    public inventarioInicialCantidad?: string,
    public inventarioInicialDinero?: string,
    public id?: number,


) {
}
}

