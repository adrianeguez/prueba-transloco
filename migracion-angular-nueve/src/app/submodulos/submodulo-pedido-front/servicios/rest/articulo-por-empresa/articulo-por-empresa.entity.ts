import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm/browser';
import { PrincipalEntity } from '@manticore-labs/ng-api';
import { ArticuloEntityInterface } from '../articulo/interfaces/articulo-entity.interface';
import { PrecioEntityInterface } from '../precio/interfaces/precio-entity.interface';
import {VentaDetalleEntityInterface} from '../venta-detalle/interfaces/venta-detalle-entity.interface';
import {EmpresaEntity} from '../empresa/empresa.entity';
import {EmpresaEntityInterface} from '../empresa/interfaces/empresa-entity-interface';

@Entity('articulo-por-empresa')
export class ArticuloPorEmpresaEntity extends PrincipalEntity {
  @Column({
    type: 'tinyint',
    name: 'habilitado',
    default: true,
  })
  habilitado: boolean = null;

  @ManyToOne('ArticuloEntity', 'articuloPorEmpresa',
    {
      nullable: true,
      onDelete: 'CASCADE',
      cascade: true,
      onUpdate: 'CASCADE',
    })
  articulo: ArticuloEntityInterface | number | string;

  @ManyToOne('EmpresaEntity', 'articuloPorEmpresa',
    {
      nullable: true,
      onDelete: 'CASCADE',
      cascade: true,
      onUpdate: 'CASCADE',
    })
  empresa: EmpresaEntityInterface | number | string;

  @OneToMany('PrecioEntity', 'articuloPorEmpresa')
  precios: PrecioEntityInterface[];

  @OneToMany( 'VentaDetalleEntity', 'articuloPorEmpresa' )
  ventasDetalle?: VentaDetalleEntityInterface[];

  valoresUnitarios: any;
}
