import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Edificio } from '../edificio/edificio';
import { Entity } from 'typeorm';

@Entity('precio')
export class Promocion extends PrincipalEntity {
  nombrePromocion: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  imagen: string;
  habilitado: boolean;
  nombre: string;
  esMatriz: boolean;
  edificio: Edificio;
  usuario: {
    nombres: string;
    apellidos: string;
  };
}
