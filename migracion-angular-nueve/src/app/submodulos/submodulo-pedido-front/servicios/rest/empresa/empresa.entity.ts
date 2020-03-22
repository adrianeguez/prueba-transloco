import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm/browser';
import {ArticuloPorEmpresaEntityInterface} from '../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';
import {PrincipalEntity} from '@manticore-labs/ng-api';

@Entity('empresa')
export class EmpresaEntity extends PrincipalEntity {

  @Column()
  razonSocial: string;

  @OneToMany('ArticuloPorEmpresaEntity', 'empresa')
  articuloPorEmpresa: ArticuloPorEmpresaEntityInterface [];
}
