import {Column, OneToMany, Entity, Index, OneToOne, JoinColumn} from 'typeorm/browser';
import {PrincipalEntity} from '@manticore-labs/ng-api';
import {TarifaImpuestoEntityInterface} from '../tarifa-impuesto/interfaces/tarifa-impuesto-entity.interface';
import {ArticuloPorEmpresaEntityInterface} from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';

@Entity('articulo')
@Index([
  'nombre',
  'codigo',
])
export class ArticuloEntity extends PrincipalEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 60,
  })
  nombre: string = null;

  @Column({
    type: 'varchar',
    name: 'nombre_corto',
    length: 60,
  })
  nombreCorto: string = null;

  @Column({
    type: 'varchar',
    name: 'descripcion',
    length: 100,
    nullable: true,
  })
  descripcion: string = null;

  @Column({
    type: 'varchar',
    name: 'codigo',
    length: 30,
    unique: true,
  })
  codigo: string = null;

  @Column({
    type: 'varchar',
    name: 'codigo_auxiliar',
    length: 30,
    nullable: true,
    unique: true,
  })
  codigoAuxiliar: string = null;

  @Column({
    type: 'varchar',
    name: 'codigo_barras',
    length: 100,
    unique: true,
  })
  codigoBarras: string = null;

  @Column({
    type: 'decimal',
    name: 'peso',
    precision: 10,
    scale: 4,
  })
  peso: number = null;

  @Column({
    type: 'tinyint',
    name: 'es_servicio',
  })
  esServicio: number = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado',
  })
  habilitado: number = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado_stock',
  })
  habilitadoStock: number = null;

  @Column({
    type: 'varchar',
    name: 'empresa_productora',
    length: 60,
    nullable: true,
  })
  empresaProductora: string = null;

  @OneToMany('ArticuloPorEmpresaEntity', 'articulo')
  articuloPorEmpresa: ArticuloPorEmpresaEntityInterface [];

  @OneToMany( 'TarifaImpuestoEntity', 'articulo')
  tarifaImpuesto: TarifaImpuestoEntityInterface[];
}
