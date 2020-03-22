import { TipoMovimientoInterface } from '../../submodulo-pedido-front/interfaces/tipo-movimiento.interface';

export interface MovimientoInterface {
  id?: number;

  codigo?: number;

  nombre?: string;

  descripcion?: string;

  formaNumerar?: boolean | number;

  numero?: number;

  numeroInventario?: number;

  nombreReferencia?: string;

  habilitado?: boolean | number;

  factorStock?: number;

  afectaCostoPromedio?: boolean | number;

  afectaCostoUltimo?: boolean | number;

  afectaCostoUltimaTransaccion?: boolean | number;

  cobrarIVA?: boolean | number;

  retencionIVA?: boolean | number;

  retencionRenta?: boolean | number;

  formaValorarInventario?: number;

  indiceAfecta?: boolean | number;

  afectaDatosUltimaCompra?: boolean | number;

  afectaDatosUltimaVenta?: boolean | number;

  tipoMovimiento?: TipoMovimientoInterface;
}
