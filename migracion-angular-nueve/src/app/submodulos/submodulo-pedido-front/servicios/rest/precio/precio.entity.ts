import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Column, Entity, Index, ManyToOne } from 'typeorm/browser';
import { ArticuloPorEmpresaEntityInterface } from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';
import { ArticuloEntityInterface } from '../articulo/interfaces/articulo-entity.interface';

@Entity('precio')
export class PrecioEntity extends PrincipalEntity {
  @Index()
  @Column({
    type: 'decimal',
    name: 'valor',
    precision: 10,
    scale: 4,
  })
  valor: number = null;

  @Column({
    type: 'decimal',
    name: 'valor_incentivo',
    precision: 10,
    scale: 4,
    nullable: true,
  })
  valorIncentivo: number = null;

  @Column({
    type: 'tinyint',
    name: 'es_principal',
  })
  esPrincipal: number = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado',
  })
  habilitado: number = null;

  @ManyToOne( 'ArticuloPorEmpresaEntity', 'precios', {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  articuloPorEmpresa: ArticuloPorEmpresaEntityInterface  | number | string;
}
