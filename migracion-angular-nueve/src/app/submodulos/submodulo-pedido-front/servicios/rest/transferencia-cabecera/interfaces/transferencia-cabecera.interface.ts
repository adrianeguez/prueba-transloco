import {BodegaInterface} from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';

export interface TransferenciaCabeceraInterface {
  id?: number;
  tipoMovimiento: string;
  serie: string;
  numeroDocumentoMovimiento: number;
  numeroDocumentoInventario: string;
  fechaPedido: string;
  fechaBodega: string;
  observacion1: string;
  observacion2: string;
  idBodegaOrigen: number;
  totalBruto: number;
  totalBrutoIva: number;
  factorStock: number;
  numeroRegistros: number;
  estatus: string;
  userId: string;
  hora: string;
  totalNeto: number;
  idBodegaDestino: number;
  descripcionPeriodo: string;
  cliente: string;
  facturaTipo: string;
  facturaSerie: string;
  facturaNumero: string;
  facturaMarca: string;
  facturaEstatus: string;
  fechaLlegada: string;
  totalPeso: number;
  aaaammdd: string;
  numeroDocumentoGuiaRemision: string;
  idEmpresa: number;
  prioridad: number;
  transferenciaDetalles: any[];
  bodega?: BodegaInterface;
}
