import {BodegaInterface} from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';

export interface IngresoEgresoCabeceraInterface {
  id?: number;
  tipoMovimiento: string;
  numeroDocumentoMovimiento: number;
  numeroDocumentoInventario: string;
  fechaPedido: string;
  fechaBodega: string;
  observacion1: string;
  observacion2: string;
  idEdificio: number;
  totalBruto: number;
  totalBrutoIva: number;
  numeroRegistros: number;
  estatus: string;
  userId: string;
  hora: string;
  totalNeto: string;
  idBodegaOrigen: string;
  idCliente: number;
  transportePor: string;
  descripcionPeriodo: string;
  totalPeso: number;
  totalBienes: number;
  totalServicios: number;
  ingresoEgresoDetalles: any[];
  bodega?: BodegaInterface;
}
