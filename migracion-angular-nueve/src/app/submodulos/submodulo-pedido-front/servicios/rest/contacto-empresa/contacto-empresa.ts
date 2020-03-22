import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Entity } from 'typeorm-sqljs';

@Entity('contacto_empresa')
export class ContactoEmpresa extends PrincipalEntity {
  observacion: string;
  habilitado: number;
}
