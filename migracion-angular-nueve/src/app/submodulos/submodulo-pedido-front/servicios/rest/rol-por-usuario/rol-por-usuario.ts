import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Entity } from 'typeorm';

@Entity('rol_por_usuario')
export class RolPorUsuario extends PrincipalEntity {
  user_id: string;
  rol: any;
}
