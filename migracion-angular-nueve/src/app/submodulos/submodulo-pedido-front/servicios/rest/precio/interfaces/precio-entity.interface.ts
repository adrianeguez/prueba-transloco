import { PrincipalEntity } from '@manticore-labs/ng-api';
import {ArticuloPorEmpresaEntityInterface} from '../../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';

export interface PrecioEntityInterface extends PrincipalEntity {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  valor: number;
  valorIncentivo: number;
  esPrincipal: number;
  habilitado: number;
  articuloPorEmpresa?: ArticuloPorEmpresaEntityInterface  | number | string;
}
