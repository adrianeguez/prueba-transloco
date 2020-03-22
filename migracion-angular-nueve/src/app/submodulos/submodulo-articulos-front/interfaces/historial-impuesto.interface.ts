import { TarifaImpuestoInterface } from './tarifa-impuesto.interface';
export interface HistorialImpuestoInterface {
  id?: number;
  tarifaImpuesto?: TarifaImpuestoInterface;
  codigoSri?: string;
  codigo?: string;
  nombre?: string;
  unidadMedida?: string;
  valorPorcentaje?: number;
  valor?: number;
  habilitado?: number | boolean;
}
