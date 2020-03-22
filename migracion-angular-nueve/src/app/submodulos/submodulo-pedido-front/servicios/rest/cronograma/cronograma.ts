import { PrincipalEntity } from '@manticore-labs/ng-api';
import { CronogramaVendedor } from '../cronograma-vendedor/cronograma-vendedor';
import { Entity } from 'typeorm-sqljs';

@Entity('cronograma')
export class Cronograma extends PrincipalEntity {
  nombreCronograma: string;
  habilitado: boolean;
  descripcion: string;
  cronogramasVendedor: CronogramaVendedor[];
}
