import { Column, Entity, OneToMany } from 'typeorm';
import { VentaDetalle } from '../venta-detalle/venta-detalle';
import { PrincipalGeneratedEntity } from '@manticore-labs/ng-api';

export class VentaCabeceraAbstractClass extends PrincipalGeneratedEntity {
  'idVendedor': number;
  'idEdificio': number;
  'tipoMovimiento': string;
  'comentario': string;
  'fecha': Date;
  'prioridad': boolean;
  'estado': string;
  'horaInicio': string;
  'horaFin': string;
  ventasDetalle: any[];
}

@Entity('venta_cabecera')
export class VentaCabecera extends VentaCabeceraAbstractClass {
  @Column({
    nullable: true,
  })
  'idVendedor': number;

  @Column({
    nullable: true,
  })
  'idEdificio': number;

  @Column({
    nullable: true,
  })
  'tipoMovimiento': string;

  @Column({
    nullable: true,
  })
  'comentario': string;

  @Column({
    nullable: true,
  })
  'fecha': Date;

  @Column({
    nullable: true,
  })
  'prioridad': boolean;

  @Column({
    nullable: true,
  })
  'estado': string;
  //  Creado CR - Pendiente PE - Parcial PA - Entregado EN - Dado de Baja DA

  @Column({
    nullable: true,
  })
  'horaInicio': string;

  @Column({
    nullable: true,
  })
  'horaFin': string;

  @OneToMany(type => VentaDetalle, ventaDetalle => ventaDetalle.ventaCabecera, {
    nullable: true,
  })
  ventasDetalle: VentaDetalle[];
}
