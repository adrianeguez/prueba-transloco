import {EdificioInterface} from '../../../interfaces/edificio.interface';
import {DireccionInterface} from '../../../interfaces/direccion.interface';
import {LocalizacionInterface} from '../../../interfaces/localizacion.interface';

export interface DatosCrearEditarEdificioInterface {
  edificio?: EdificioInterface;
  direccion?: DireccionInterface;
  localizacion?: LocalizacionInterface;
  idEdificio?: number;
  idDireccion?: number;
  idLocalizacion?: string;
  idEmpresa?: number;
  entidadNombre?: string;
}
