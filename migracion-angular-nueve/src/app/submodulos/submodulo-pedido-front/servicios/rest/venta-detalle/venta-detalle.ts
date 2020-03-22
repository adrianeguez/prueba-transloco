import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VentaCabecera } from '../venta-cabecera/venta-cabecera';
import { DescuentoVenta } from '../descuento-venta/descuento-venta';
import { PrincipalGeneratedEntity } from '@manticore-labs/ng-api';

@Entity('venta_detalle')
export class VentaDetalle extends PrincipalGeneratedEntity {
  'codigo': string;

  @Column({
    nullable: true,
  })
  'nombre': string;

  @Column({
    nullable: true,
  })
  'idArticulo': number;

  @Column()
  'cantidad': number;

  @Column()
  'cantidadPromocion': number;

  @Column()
  'cantidadTotal': number;

  @Column()
  'cantidadPendiente': number;

  @Column({
    nullable: true,
    default: 0,
  })
  'cantidadEntregada': number;

  @Column({
    nullable: true,
    default: 0,
  })
  'cantidadDadaBaja': number;

  @Column({
    nullable: true,
  })
  'valorUnitario': number;

  @ManyToOne(
    type => VentaCabecera,
    ventaCabecera => ventaCabecera.ventasDetalle,
    {
      nullable: true,
    },
  )
  ventaCabecera?: VentaCabecera;

  @OneToMany(
    type => DescuentoVenta,
    descuentoVenta => descuentoVenta.ventaDetalle,
    {
      nullable: true,
    },
  )
  descuentos?: DescuentoVenta[];
}
