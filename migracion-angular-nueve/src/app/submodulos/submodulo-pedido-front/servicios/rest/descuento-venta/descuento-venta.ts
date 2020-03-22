import { Column, Entity, ManyToOne } from 'typeorm';
import { VentaDetalle } from '../venta-detalle/venta-detalle';
import { PrincipalGeneratedEntity } from '@manticore-labs/ng-api';

@Entity('descuento_venta')
export class DescuentoVenta extends PrincipalGeneratedEntity {
  updatedAt?: Date;

  @Column({
    nullable: true,
  })
  'orden': number;

  @Column({
    nullable: true,
  })
  'base': number;

  @Column()
  'porcentaje': number;

  @Column()
  'valor': number;

  @Column({
    nullable: true,
  })
  'razon': string;
  // A B C  678905840

  @ManyToOne(type => VentaDetalle, ventaDetalle => ventaDetalle.descuentos)
  ventaDetalle: VentaDetalle | number;
}
