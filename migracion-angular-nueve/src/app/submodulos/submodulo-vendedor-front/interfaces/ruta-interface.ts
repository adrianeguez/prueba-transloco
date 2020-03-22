import { RutaInterface } from '@manticore-labs/ng-api';
import { RutaClienteInterface } from './ruta-cliente-interface';
import { BodegaInterface } from '../../submodulo-empresa-front/interfaces/bodega.interface';

export interface RutaInterface {
  id?: number;

  empresa?: number | string;

  nombre?: string;

  habilitado?: boolean | number;

  lugar?: RutaInterface | number | string;

  bodega?: BodegaInterface | number | string | any;

  rutaCliente?: RutaClienteInterface[];
}
