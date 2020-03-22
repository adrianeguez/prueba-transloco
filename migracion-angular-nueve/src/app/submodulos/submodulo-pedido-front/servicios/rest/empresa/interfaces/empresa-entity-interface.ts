import {Column, OneToMany} from 'typeorm/browser';
import {ArticuloPorEmpresaEntityInterface} from '../../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';

export interface EmpresaEntityInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  razonSocial?: string;
  articuloPorEmpresa?: ArticuloPorEmpresaEntityInterface [];
}
