import {DatosCompraInterface, DatosPedidoCompraInterface} from '../../componentes/compra/compra/compra.component';
import {DatosClientesInterface} from '../../componentes/clientes/clientes/clientes.component';
import {DatosAjustesInterface} from '../../componentes/ajustes/ajustes/ajustes.component';
import {DatosTransferenciaInterface} from '../../componentes/transferencia/transferencia/transferencia.component';
import {InformacionTributariaInterface} from '../../../submodulo-empresa-front/interfaces/informacion-tributaria.interface';
import {PedidoDetalleInterface} from '../pedido-detalle.interface';
import {DatosCabeceraVentaInterface} from '../../servicios/cargar-ventas.service';

/*export interface MovimientoCabeceraInterface {
  idEdificio: number;
  idVendedor: number;
  idMovimiento: number;
  idBodegaOrigen: number;
  idClienteOProveedor: number;
  datosCabecera?: DatosCompraInterface | DatosClientesInterface | DatosAjustesInterface | DatosTransferenciaInterface;
  tipoMovimiento?: string;
  informacionTributaria?: InformacionTributariaInterface;
}*/

export interface MovimientoCabeceraInterface {
  idEdificio?: number;
  idVendedor?: number;
  idMovimiento?: number;
  idClienteOProveedor?: number;
  idBodegaOrigen?: number;
  idOperarioOVendedor?: number;
  tipoMovimiento?: string | number;
  informacionTributaria?: InformacionTributariaInterface;
  idOperario?: number;
  datosCabecera?:
    DatosCompraInterface |
    DatosPedidoCompraInterface |
    DatosClientesInterface |
    DatosAjustesInterface |
    DatosTransferenciaInterface |
    DatosCabeceraVentaInterface;
  ventasDetalle?: PedidoDetalleInterface[];
  estado?: string;
  estadoVenta?: string;
  id?: number;
}
