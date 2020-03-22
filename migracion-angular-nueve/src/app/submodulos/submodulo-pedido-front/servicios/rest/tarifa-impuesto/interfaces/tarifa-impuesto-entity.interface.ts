import {HistorialImpuestoEntityInterface} from '../../historial-impuesto/interfaces/historial-impuesto-entity.interface';
import {ArticuloEntityInterface} from '../../articulo/interfaces/articulo-entity.interface';

export interface TarifaImpuestoEntityInterface {
  habilitado: boolean;
  historialImpuesto: HistorialImpuestoEntityInterface[];
  articulo: ArticuloEntityInterface;
}
