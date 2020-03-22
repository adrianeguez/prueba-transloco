import { EmpresaProveedoresInterface } from './empresa-proveedores.interface';

export interface CalificacionProveedorInterface {
  id?: number;
  calificacion?: number;
  observacion?: string;
  empresaProveedor?: EmpresaProveedoresInterface | number | string;
}
