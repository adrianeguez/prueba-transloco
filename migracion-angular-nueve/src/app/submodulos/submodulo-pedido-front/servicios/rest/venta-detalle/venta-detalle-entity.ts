import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {VentaCabeceraEntity} from '../venta-cabecera/venta-cabecera-entity';
import {DescuentoVentaEntity} from '../descuento-venta/descuento-venta-entity';
import {PrincipalGeneratedEntity} from '@manticore-labs/ng-api';
import {VentaCabeceraEntityInterface} from '../venta-cabecera/interfaces/venta-cabecera-entity.interface';
import {DescuentoVentaEntityInterface} from '../descuento-venta/interfaces/descuento-venta-entity.interface';
import {ArticuloPorEmpresaEntityInterface} from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';

@Entity('venta_detalle')
export class VentaDetalleEntity extends PrincipalGeneratedEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({
    nullable: true
  })
  createdAt?: Date;
  @Column({
    nullable: true
  })
  updatedAt?: Date;

  @Column({
    nullable: true
  })
  'codigo': string;

  @Column({
    nullable: true
  })
  'nombre': string;

  @Column({
    nullable: true
  })
  'idArticulo': number;

  @Column({
    nullable: true
  })
  'cantidad': number;

  @Column( {
    nullable: true
  })
  'cantidadPromocion': number;

  @Column({
    nullable: true
  })
  'cantidadTotal': number;

  @Column({
    nullable: true
  })
  'cantidadPendiente': number;

  @Column({
    nullable: true,
    default: 0
  })
  'cantidadEntregada': number;

  @Column({
    nullable: true,
    default: 0
  })
  'cantidadDadaBaja': number;


  @Column({
    nullable: true
  })
  'valorUnitario': number;

  @Column({
    nullable: true
  })
  'cantidadPedida': number;

  @Column({
    nullable: true
  })
  'descuento': number;

  @Column({
    nullable: true
  })
  'descuentoPorcentual': number;

  @Column({
    nullable: true
  })
  'descuentosPorcentuales': number;

  @Column({
    nullable: true
  })
  'descuentoValor': number;

  @Column({
    nullable: true
  })
  'descuentoPromocion': number;

  @Column({
    nullable: true
  })
  'subtotal': number;

  @Column({
    nullable: true
  })
  'totalBruto': number;

  @Column({
    nullable: true
  })
  'totalDescuentos': number;

  @Column({
    nullable: true
  })
  'idArticuloEmpresa': number;


  @ManyToOne( 'VentaCabeceraEntity', 'ventaDetalle', {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
    onUpdate: 'CASCADE'
  })
  ventaCabecera?: VentaCabeceraEntityInterface | number | string;
  //
  // @ManyToOne( 'ArticuloPorEmpresaEntity', 'ventaDetalle', {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  //   cascade: true,
  //   onUpdate: 'CASCADE',
  // })
  // articuloPorEmpresa?: ArticuloPorEmpresaEntityInterface | number | string;


  @OneToMany( 'DescuentoVentaEntity', 'ventaDetalle')
  descuentos?: DescuentoVentaEntityInterface[];
}
