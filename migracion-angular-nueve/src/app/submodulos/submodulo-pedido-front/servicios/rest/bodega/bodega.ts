import { PrincipalEntity } from '@manticore-labs/ng-api';
import { ArticuloPorBodega } from '../articulo-por-bodega/articulo-por-bodega';
import { Entity } from 'typeorm-sqljs';

@Entity('bodega')
export class Bodega extends PrincipalEntity {
  articulos: ArticuloPorBodega[];
}
