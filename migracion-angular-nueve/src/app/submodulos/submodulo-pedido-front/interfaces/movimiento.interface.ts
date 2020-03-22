export interface MovimientoInterface {
  id?: number;
  codigo: number;
  nombre: string;
  descripcion: string;
  formaNumerar: boolean;
  numero: number;
  nombreReferencia: string;
  habilitado: boolean;
  factorStock: boolean;
  afectaCostoPromedio: boolean;
  afectaCostoUltimo: boolean;
  afectaCostoUltimaTransaccion: boolean;
  cobrarIVA: boolean;
  retencionIVA: boolean;
  retencionRenta: boolean;
  formaValorarInventario: boolean;
  indiceAfecta: boolean;
  afectaDatosUltimaCompra: boolean;
  afectaDatosUltimaVenta: boolean;
  tipoMovimiento: {
    nombre: string;
  };
}
