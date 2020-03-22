import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { PrincipalEntity } from '@manticore-labs/ng-api';
import { TarifaImpuestoEntityInterface } from '../tarifa-impuesto/interfaces/tarifa-impuesto-entity.interface';

@Entity('historial-impuesto')
export class HistorialImpuestoEntity extends PrincipalEntity {
  @Column({
    name: 'codigo_sri_tarifa',
    type: 'varchar',
    length: 10,
  })
  codigoSriTarifa: string = null;

  @Column({
    name: 'codigo_sri_impuesto',
    type: 'varchar',
    length: 10,
  })
  codigoSriImpuesto: string = null;

  @Column({
    name: 'nombre_tarifa',
    type: 'varchar',
    length: 60,
  })
  nombreTarifa: string = null;

  @Column({
    name: 'nombre_Impuesto',
    type: 'varchar',
    length: 60,
  })
  nombreImpuesto: string = null;

  @Column({
    name: 'unidad_medida',
    type: 'varchar',
    length: 10,
  })
  unidadMedida: string = null;

  @Column({
    name: 'cantidad',
    type: 'int',
    nullable: true,
  })
  cantidad: number = null;

  @Column({
    type: 'decimal',
    name: 'valor_porcentaje',
    precision: 6,
    scale: 4,
    nullable: true,
  })
  valorPorcentaje: number = null;

  @Column({
    type: 'decimal',
    name: 'valor',
    precision: 10,
    scale: 4,
    nullable: true,
  })
  valor: number = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado',
  })
  habilitado: number = null;

  @ManyToOne('TarifaImpuestoEntity', 'historialImpuesto', {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
    onUpdate: 'CASCADE',
  })
  tarifaImpuesto: TarifaImpuestoEntityInterface | number | string;
}
