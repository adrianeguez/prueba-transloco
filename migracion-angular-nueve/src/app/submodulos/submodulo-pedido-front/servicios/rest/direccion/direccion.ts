import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Entity } from 'typeorm';

@Entity('descuento_venta')
export class Direccion extends PrincipalEntity {
  numeroCelular: string;
  numeroWhatsApp: string;
  numeroCalle: string;
  callePrincipal: string;
  calleSecundaria: string;
  nombreEdificio: string;
  piso: string;
  sector: string;
  referencia: string;
  localizacion?: {
    id: string;
    entidadId: string;
    entidadNombre: string;
    localizacion: {
      type: string;
      coordinates: [number, number];
    };
  };
}
