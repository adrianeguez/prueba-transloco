import {ArticuloInterface} from '../../submodulo-articulos-front/interfaces/articulo.interface';
import { EmpresaProveedoresInterface } from '../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';
import {PreciosInterface} from '../../submodulo-empresa-front/interfaces/precios.interface';
import {TarifaImpuestoEntity} from '../servicios/rest/tarifa-impuesto/tarifa-impuesto.entity';

export interface ArticuloEmpresaInterface {
  id?: number;
  articulo?: ArticuloInterface | any;
  empresa?: EmpresaProveedoresInterface | number | string;
  precios?: PreciosInterface;
}
