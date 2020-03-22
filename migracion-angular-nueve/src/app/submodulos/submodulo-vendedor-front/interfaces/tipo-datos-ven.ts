import {DatosVendedorInterface} from './datos-vendedor-interface';
import {TipoVendedorInterface} from './tipo-vendedor-interface';


export interface TipoDatosVenInterface {
  id?: number;

  habilitado?: boolean | number;

  datosVendedor?: DatosVendedorInterface | number | string;

  tipoVendedor?: TipoVendedorInterface | number | string ;

}
