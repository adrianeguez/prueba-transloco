import { TipoImpuestoInterface } from './tipo-impuesto.interface';

export interface TarifaInterface {
  id?: number;
  tipoImpuesto?: number | string | TipoImpuestoInterface;
  codigoSri?: string;
  codigo?: string;
  nombre?: string;
  unidadMedida?: string;
  cantidad?: number;
  valor?: number;
  valorPorcentaje?: number;
  habilitado?: number | boolean;
}
