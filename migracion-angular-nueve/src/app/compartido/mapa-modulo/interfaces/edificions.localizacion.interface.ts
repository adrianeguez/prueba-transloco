import {EdificioInterface} from 'src/app/submodulos/submodulo-empresa-front/interfaces/edificio.interface';
import {EstablecimientoInterface} from 'src/app/submodulos/submodulo-empresa-front/interfaces/establecimiento.interface';
import {LocalizacionInterface} from 'src/app/submodulos/submodulo-empresa-front/interfaces/localizacion.interface';

export interface EdificioLocalizacionInterface extends EdificioInterface {
  establecimientos?: EstablecimientoInterface[];
  localizacion?: LocalizacionInterface;
}
