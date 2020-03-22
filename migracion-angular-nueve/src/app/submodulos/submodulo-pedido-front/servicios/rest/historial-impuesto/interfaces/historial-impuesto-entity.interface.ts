import {TarifaImpuestoEntityInterface} from '../../tarifa-impuesto/interfaces/tarifa-impuesto-entity.interface';

export interface HistorialImpuestoEntityInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  codigoSriTarifa: string;
  codigoSriImpuesto: string;
  nombreTarifa: string;
  nombreImpuesto: string;
  unidadMedida: string;
  cantidad: number;
  valorPorcentaje: number;
  valor: number;
  habilitado: number;
  tarifaImpuesto: TarifaImpuestoEntityInterface | number | string;
}
