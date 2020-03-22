import { PrincipalEntity } from '@manticore-labs/ng-api';
import { Edificio } from '../edificio/edificio';
import { DatosUsuario } from '../datos-usuario/datos-usuario';
import { Kilometraje } from '../kilometraje/kilometraje';
import { Entity } from 'typeorm-sqljs';

@Entity('automovil')
export class Automovil extends PrincipalEntity {
  modelo: string;
  placa: string;
  fechaUltimoChequeo: Date | string;
  imagen: string;
  kilometraje: number;
  kilometrajes: Kilometraje[];
  edificio: Edificio | any;
  usuario: DatosUsuario | any;
}
