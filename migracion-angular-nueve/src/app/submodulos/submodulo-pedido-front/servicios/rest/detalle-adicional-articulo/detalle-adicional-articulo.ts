import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ArticuloEntity } from '../articulo/articulo.entity';

@Entity('detalle_adicional_articulo')
export class DetalleAdicionalArticulo extends PrincipalEntity {
  @Column({
    nullable: true,
  })
  'nombre': string;
  @Column({
    nullable: true,
  })
  'valor': number;
}
