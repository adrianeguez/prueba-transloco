import {RutaClienteInterface} from './ruta-cliente-interface';
import {DatosVendedorInterface} from './datos-vendedor-interface';

export interface VendedoresRutaClienteInterface {
  id?: number;

  rutaCliente?: RutaClienteInterface | number | string | RutaClienteInterface[];

  datosVendedor?: DatosVendedorInterface[] | DatosVendedorInterface | number | string;

  habilitado?: number | boolean;
}
