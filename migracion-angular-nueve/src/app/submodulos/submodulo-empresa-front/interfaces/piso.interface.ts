import { EdificioInterface } from './edificio.interface';
import { AreaPisoInterface } from './area-piso.interface';

export interface PisoInterface {
  id?: number;

  nombre?: string;

  habilitado?: number | boolean;

  ordenPiso?: number;

  edificio?: EdificioInterface | number | string;

  areasPiso?: AreaPisoInterface[];
}
