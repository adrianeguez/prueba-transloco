import { EdificioInterface } from './edificio.interface';

export interface EstablecimientoInterface {
  id?: number;

  nombre?: string;

  habilitado?: number | boolean;

  codigo?: string;

  edificio?: EdificioInterface | number | string;
}
