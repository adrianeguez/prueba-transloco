import {Entity, ManyToOne, OneToMany, Column, JoinColumn, OneToOne} from 'typeorm/browser';
import {PrincipalEntity} from '@manticore-labs/ng-api';
import {ArticuloPorEmpresaEntityInterface} from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';
import {HistorialImpuestoEntityInterface} from '../historial-impuesto/interfaces/historial-impuesto-entity.interface';
import {ArticuloEntityInterface} from '../articulo/interfaces/articulo-entity.interface';

@Entity('tarifa-impuesto')
export class TarifaImpuestoEntity extends PrincipalEntity {
  @Column({
    type: 'tinyint',
    name: 'habilitado',
  })
  habilitado: number = null;

  @OneToMany('HistorialImpuestoEntity', 'tarifaImpuesto')
  historialImpuesto: HistorialImpuestoEntityInterface[];

  @ManyToOne('ArticuloEntity', 'tarifaImpuesto', {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
    onUpdate: 'CASCADE',
  })
  articulo: ArticuloEntityInterface | number | string;
}
