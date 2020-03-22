export interface PedidoInterface {
  tipoMovimiento?: string;
  numeroDocumentoMovimiento: number;
  subtotal?: number;
  totalNeto?: number;
  estatus: string;
  fechaPedido: string;
  descripcionPeriodo: string;
  idBodegaOrigen: number;
}
