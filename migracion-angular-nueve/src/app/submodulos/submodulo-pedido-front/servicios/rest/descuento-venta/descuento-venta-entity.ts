import {Column, Entity, ManyToOne} from 'typeorm';
import {VentaDetalleEntity} from '../venta-detalle/venta-detalle-entity';
import {PrincipalGeneratedEntity} from '@manticore-labs/ng-api';
import {VentaCabeceraEntityInterface} from '../venta-cabecera/interfaces/venta-cabecera-entity.interface';

@Entity('descuento_venta')
export class DescuentoVentaEntity extends PrincipalGeneratedEntity {

    @Column({
        nullable: true
    })
    'orden': number;

    @Column({
        nullable: true
    })
    'base': number;

    @Column()
    'porcentaje': number;

    @Column()
    'valor': number;

    @Column({
        nullable: true
    })
    'razon': string;

  @ManyToOne( 'VentaDetalleEntity', 'descuentos', {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
    onUpdate: 'CASCADE'
  })
  ventaDetalle?: VentaCabeceraEntityInterface | number | string;
}
