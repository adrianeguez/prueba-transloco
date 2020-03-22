import {PrincipalEntity} from '@manticore-labs/ng-api';
import {Column, OneToMany} from 'typeorm/browser';
import {ArticuloPorEmpresaEntityInterface} from '../../articulo-por-empresa/interfaces/articulo-por-empresa-entity.interface';
import {TarifaImpuestoEntityInterface} from '../../tarifa-impuesto/interfaces/tarifa-impuesto-entity.interface';

export interface ArticuloEntityInterface extends PrincipalEntity {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  nombre: string;
  nombreCorto: string;
  descripcion: string;
  codigo: string;
  codigoAuxiliar: string;
  codigoBarras: string;
  peso: number;
  esServicio: number;
  habilitado: number;
  habilitadoStock: number;
  empresaProductora: string;
  articuloPorEmpresa: ArticuloPorEmpresaEntityInterface [];
  tarifaImpuesto: TarifaImpuestoEntityInterface[];
}
