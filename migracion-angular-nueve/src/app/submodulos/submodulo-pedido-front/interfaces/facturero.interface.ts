export interface FactureroInterface {
  numeroSerie?: string;
  numeroDesde?: string;
  numeroHasta?: string;
  numeroAutorizacion?: string;
  fechaImpresion?: Date | string;
  validoHasta?: Date | string;
  estado?: string;
}
