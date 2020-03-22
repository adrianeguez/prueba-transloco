import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm/browser';
import {PrincipalEntity, PrincipalGeneratedEntity} from '@manticore-labs/ng-api';
import {HistorialImpuestoEntityInterface} from '../historial-impuesto/interfaces/historial-impuesto-entity.interface';
import {VentaDetalleEntityInterface} from '../venta-detalle/interfaces/venta-detalle-entity.interface';

@Entity('venta_cabecera')
export class VentaCabeceraEntity extends  PrincipalGeneratedEntity  {

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
  idOperarioOVendedor: number;

  @Column({
    nullable: true
  })
  idEdificio: number;

  @Column({
    nullable: true
  })
  idBodegaOrigen: number;

  @Column({
    nullable: true
  })
  idClienteProveedor: number;

  @Column({
    nullable: true
  })
  tipoMovimiento: string;

  @Column({
    nullable: true
  })
  comentario: string;

  @Column({
    nullable: true
  })
  fecha: string;

  @Column({
    nullable: true
  })
  prioridad: boolean;

  @Column({
    nullable: true
  })
  estado: string;
  //  Creado CR - Pendiente PE - Parcial PA - Entregado EN - Dado de Baja DA

  @Column({
    nullable: true
  })
  telefono: string;

  @Column({
    nullable: true
  })
  direccion: string;

  @Column({
    nullable: true
  })
  nombre: string;

  @Column({
    nullable: true
  })
  correo: string;

  @Column({
    nullable: true
  })
  documento: string;

  @Column({
    nullable: true
  })
  observacion: string;

  @Column({
    nullable: true
  })
  seEnvio: boolean;

  @Column({})
  estadoVenta: string;

  @OneToMany( 'VentaDetalleEntity', 'ventaCabecera' )
  ventasDetalle?: VentaDetalleEntityInterface[];
}
