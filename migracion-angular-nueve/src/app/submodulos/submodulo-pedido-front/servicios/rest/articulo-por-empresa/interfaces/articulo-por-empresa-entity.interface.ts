import { PrincipalEntity } from '@manticore-labs/ng-api';
import {VentaDetalleEntityInterface} from '../../venta-detalle/interfaces/venta-detalle-entity.interface';
import {ArticuloEntityInterface} from '../../articulo/interfaces/articulo-entity.interface';
import {EmpresaEntityInterface} from '../../empresa/interfaces/empresa-entity-interface';

export interface ArticuloPorEmpresaEntityInterface extends PrincipalEntity {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  habilitado: boolean;
  ventasDetalle?: VentaDetalleEntityInterface[];
  articulo?: ArticuloEntityInterface;
  empresa?: EmpresaEntityInterface;
}
