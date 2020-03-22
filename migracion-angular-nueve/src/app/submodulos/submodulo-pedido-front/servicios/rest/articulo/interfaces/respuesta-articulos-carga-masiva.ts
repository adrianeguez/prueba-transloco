import { ArticuloEntity } from '../articulo.entity';
import { EmpresaProveedores } from '../../empresa-proveedores/empresa-proveedores';
import { PrincipalEntity } from '@manticore-labs/ng-api';

export class RespuestaArticulosCargaMasiva extends PrincipalEntity {
  articulo: ArticuloEntity;
  empresaProveedores: EmpresaProveedores;
}
