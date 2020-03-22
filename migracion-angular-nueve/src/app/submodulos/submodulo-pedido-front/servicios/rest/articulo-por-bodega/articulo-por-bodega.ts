import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Entity } from 'typeorm-sqljs';

@Entity('articulo_por_bodega')
export class ArticuloPorBodega extends PrincipalEntity {
  codigoArticulo: number;
  nombreArticulo: string;
  unidadMedida: string;
  empresaProductora: string;
  stockActual: number;
  stockMinimo: number;
  stockMaximo: number;
  stockAlerta: number;
}
