import { PrincipalEntity } from '@manticore-labs/ng-api';
import { ContactoEmpresa } from '../contacto-empresa/contacto-empresa';
import { Entity } from 'typeorm-sqljs';

@Entity('datos_vendedor')
export class DatosVendedor extends PrincipalEntity {
  nombreVendedor: string;
  documento: string;
  fechaIngreso: Date;
  fechaSalida: Date;
  habilitado: boolean;
  contactoEmpresa: ContactoEmpresa | number | any;
}
