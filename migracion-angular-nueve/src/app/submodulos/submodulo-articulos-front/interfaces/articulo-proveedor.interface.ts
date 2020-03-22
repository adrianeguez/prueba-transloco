import { EmpresaProveedoresInterface } from './../../submodulo-empresa-front/interfaces/empresa-proveedores.interface';
import { ArticuloInterface } from './articulo.interface';
export interface ArticuloProveedorInterface {
  id?: number;
  articulo?: ArticuloInterface | number | string;
  empresaProveedores?: EmpresaProveedoresInterface | number | string;
  habilitado?: boolean | number;
}
