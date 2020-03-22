import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Entity } from 'typeorm-sqljs';

@Entity('contacto_empresa')
export class DatosUsuario extends PrincipalEntity {
  nombres?: string;
  user_id?: string;
  apellidos?: string;
  direccion?: string;
  celular?: string;
  identificacionPais?: string;
  habilitadoAuth0?: boolean;
}
