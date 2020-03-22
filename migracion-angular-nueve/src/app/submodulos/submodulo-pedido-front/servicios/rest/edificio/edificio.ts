import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Direccion } from '../direccion/direccion';

export class Edificio extends PrincipalEntity {
  nombre: string;
  telefono?: string;
  whatsapp?: string;
  nombreResponsable?: string;
  habilitado: number;
  esMatriz?: number;
  direccion?: any | Direccion | number;
}
