import {BodegaInterface} from '../../../../../submodulo-empresa-front/interfaces/bodega.interface';

export interface ArticuloPorBodegaInterface {
  'id'?: number;
  'codigoArticulo'?: string;
  'inventarioFinalCantidad'?: number;
  'inventarioFinalCostoUnitario'?: number;
  'idEmpresa'?: number;
  bodega?: BodegaInterface;
}
