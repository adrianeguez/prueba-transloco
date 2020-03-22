export interface PedidoCompraDetalleInterface {
  id?: number;
  compraCabecera?: number;
  codigo?: number;
  cantidad?: number;
  cantidadPromocion?: number;
}

export interface CompraDetalleInterface {
  id?: number;
  compraCabecera?: number;
  codigo?: number;
  cantidad?: number;
  cantidadPromocion?: number;
  valorUnitario?: number;
  descuentos?: DescuentosCompraDetalleInterface[];
}

export interface DescuentosCompraDetalleInterface {
  orden?: number;
  porcentaje?: number;
  valor?: number;
  base?: number;
  razon?: string;
}
