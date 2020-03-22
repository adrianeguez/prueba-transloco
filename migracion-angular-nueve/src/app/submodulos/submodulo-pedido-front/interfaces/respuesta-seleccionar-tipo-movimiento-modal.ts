import { MovimientoInterface } from './movimiento.interface';

export interface RespuestaSeleccionarTipoMovimientoModal {
  data: MovimientoInterface;
  index?: any;
  originalEvent: any;
  type: string;
}
