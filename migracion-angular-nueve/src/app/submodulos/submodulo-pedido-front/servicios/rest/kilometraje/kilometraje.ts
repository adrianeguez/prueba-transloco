import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Edificio } from '../edificio/edificio';
import { DatosUsuario } from '../datos-usuario/datos-usuario';
import { Entity } from 'typeorm';

@Entity('empresa_proveedores')
export class Kilometraje extends PrincipalEntity {
  actual?: number;
  siguiente?: number;
  habilitado?: boolean;
  idEdificio?: Edificio | number | any;
  edificio?: Edificio;
  usuario?: DatosUsuario;
}
