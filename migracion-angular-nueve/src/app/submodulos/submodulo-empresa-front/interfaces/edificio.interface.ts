import { EmpresaInterface } from './empresa.interface';
import { DireccionInterface } from './direccion.interface';
import {RutaInterface} from '../../submodulo-vendedor-front/interfaces/ruta-interface';
import {LugarInterface} from '../../submodulo-vendedor-front/interfaces/lugar-interface';
import {EdiCliRutaInterface} from '../../submodulo-vendedor-front/interfaces/edi-cli-ruta.interface';

export interface EdificioInterface {
  id?: number;
  nombre?: string;
  habilitado?: number | boolean;
  esMatriz?: number | boolean;
  empresa?: EmpresaInterface | number | string;
  direccion?: DireccionInterface | number | string;
  ruta?: RutaInterface | number | string;
  ediCliRuta?: EdiCliRutaInterface | any;
}
