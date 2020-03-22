import {ArticuloEmpresaInterface} from '../../../../submodulo-articulos-front/interfaces/articulo-empresa.interface';
import {EstablecimientoInterface} from '../../../../submodulo-empresa-front/interfaces/establecimiento.interface';

export interface ServicioEstablecimientoInterface {
  id?: number;
  habilitado?: 1|0;
  precio?: number;
  articuloPorEmpresa?: ArticuloEmpresaInterface | number;
  establecimiento?: EstablecimientoInterface | number;
}
