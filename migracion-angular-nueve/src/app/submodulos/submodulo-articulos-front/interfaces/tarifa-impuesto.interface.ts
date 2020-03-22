import { ArticuloInterface } from './articulo.interface';
import { HistorialImpuestoInterface } from './historial-impuesto.interface';
import { TipoImpuestoInterface } from './tipo-impuesto.interface';
export interface TarifaImpuestoInterface {
  id?: number;
  articulo: ArticuloInterface | any;
  tipoImpuesto: TipoImpuestoInterface | string | number;
  historialImpuesto: HistorialImpuestoInterface[] | HistorialImpuestoInterface;
}
