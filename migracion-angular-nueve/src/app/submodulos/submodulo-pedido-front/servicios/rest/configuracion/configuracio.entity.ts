import {Column, OneToMany, Entity, Index, OneToOne, JoinColumn} from 'typeorm/browser';
import {PrincipalEntity} from '@manticore-labs/ng-api';

@Entity('configuracion')
export class ConfiguracionEntity extends PrincipalEntity {
  @Column({
    type: 'tinyint',
    name: 'estado-carga',
  })
  estaCargando: boolean | number;
}
