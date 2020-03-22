import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Entity } from 'typeorm-sqljs';

@Entity('cronograna_vendedor')
export class CronogramaVendedor extends PrincipalEntity {
  orden: number;
  fecha: Date;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  domingo: boolean;
  horaVisita: string;
  visitado: boolean;
  idEdificio: number;
}
