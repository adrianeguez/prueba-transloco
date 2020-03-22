import { DescuentoMenuDetalleInterface } from './descuento-menu-detalle.interface';

export interface DescuentoMenuInterface {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  descripcion?: string;
  tipo?: 'D' | 'F';
  habilitado?: 0 | 1;
  lunes?: 0 | 1;
  martes?: 0 | 1;
  miercoles?: 0 | 1;
  jueves?: 0 | 1;
  viernes?: 0 | 1;
  sabado?: 0 | 1;
  domingo?: 0 | 1;
  fechaInicia?: string;
  fechaFinaliza?: string;
  horaInicia?: string;
  horaFinaliza?: string;
  descuentosMenuDetalles?: DescuentoMenuDetalleInterface[];
}
