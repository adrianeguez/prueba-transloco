import {FormaCalculoInterface} from './forma-calculo.interface';
import {DescuentoInterface} from './descuento.interface';
import {ArticuloEmpresaInterface} from './articulo-empresa.interface';
import {ValorUnitarioInterface} from './valor-unitario.interface';
import {CompraCabeceraInterface} from '../servicios/rest/compra-cabecera/interfaces/compra-cabecera-interface';
import {DescuentosCompraDetalleInterface} from '../servicios/rest/compra-detalle/interfaces/compra-detalle.interface';

export interface PedidoDetalleInterface {
  id?: number;
  articuloEmpresa?: ArticuloEmpresaInterface | any;
  codigo?: string;
  nombreArticulo?: string;
  subgrupo?: string;
  cantidad?: number;
  cantidadPromocion?: number;
  valorUnitario?: number | ValorUnitarioInterface;
  descuentoPorcentual?: number;
  descuento?: number;
  descuentos?: Array<DescuentoInterface>;
  compraDescuentos?: DescuentosCompraDetalleInterface[];
  descuentosPorcentuales?: number;
  totalDescuentos?: number;
  totalBruto?: number;
  descuentoValor?: number;
  descuentoPromocion?: number;
  subtotal?: number;
  formaCalculo?: FormaCalculoInterface | string | any;
  cantidadPedida?: number;
  cantidadPendiente?: number;
  cantidadDadaBaja?: number;
  cantidadEntregada?: number;
  cantidadBodegaOrigen?: number;
  cantidadBodegaDestino?: number;
  valido?: boolean;
}
