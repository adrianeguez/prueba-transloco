import {Column} from 'typeorm/browser';
import {PrimaryGeneratedColumn} from 'typeorm';
import {VentaDetalleEntityInterface} from '../../venta-detalle/interfaces/venta-detalle-entity.interface';

export interface VentaCabeceraEntityInterface {

  id?: number;

  createdAt?: Date;

  updatedAt?: Date;

  idOperarioOVendedor: number;

  idBodegaOrigen: number;

  idEdificio: number;

  idClienteProveedor: number;

  tipoMovimiento: string;

  comentario: string;

  fecha: string;

  prioridad: boolean;

  estado: string;
  //  Creado CR - Pendiente PE - Parcial PA - Entregado EN - Dado de Baja DA

  telefono: string;

  direccion: string;

  nombre: string;

  correo: string;

  documento: string;

  observacion: string;

  seEnvio: boolean;

  estadoVenta: string;

  ventasDetalle?: VentaDetalleEntityInterface[];

}
