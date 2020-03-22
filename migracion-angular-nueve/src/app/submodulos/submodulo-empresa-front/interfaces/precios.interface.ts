import { ArticuloEmpresaInterface } from '../../submodulo-articulos-front/interfaces/articulo-empresa.interface';
export interface PreciosInterface {
  id?: number;
  valor?: number;
  valorIncentivo?: number;
  esPrincipal?: number | boolean;
  habilitado?: number | boolean;
  articuloPorEmpresa?: ArticuloEmpresaInterface | number | string;
}
