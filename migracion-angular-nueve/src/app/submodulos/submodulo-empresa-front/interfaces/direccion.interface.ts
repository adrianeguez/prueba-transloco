import { EdificioInterface } from './edificio.interface';
import { LocalizacionInterface } from './localizacion.interface';
import {LugarInterface} from '../../submodulo-vendedor-front/interfaces/lugar-interface';

export interface DireccionInterface {
  id?: number;

  numeroCalle?: string;

  callePrincipal?: string;

  calleSecundaria?: string;

  nombreEdificio?: string;

  piso?: string;

  sector?: string;

  referencia?: string;

  edificio?: EdificioInterface | number | string;

  localizacion?: LocalizacionInterface;

  lugar?: LugarInterface | number| string;
}
