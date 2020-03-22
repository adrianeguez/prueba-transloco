import { GeojsonInterface } from './geojson.interface';

export interface LocalizacionInterface {
  id?: number | string;

  entidadId?: string;

  entidadNombre?: string;

  localizacion?: GeojsonInterface;
}
