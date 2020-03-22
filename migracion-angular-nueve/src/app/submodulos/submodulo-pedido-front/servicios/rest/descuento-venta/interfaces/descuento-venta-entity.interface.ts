import {Column} from 'typeorm';
import {VentaDetalleEntityInterface} from '../../venta-detalle/interfaces/venta-detalle-entity.interface';

export interface DescuentoVentaEntityInterface {
  id?: number;

  orden?: number;

  base?: number;

  porcentaje?: number;

  valor?: number;

  razon?: string;

  ventaDetalle?: VentaDetalleEntityInterface | number;
}
