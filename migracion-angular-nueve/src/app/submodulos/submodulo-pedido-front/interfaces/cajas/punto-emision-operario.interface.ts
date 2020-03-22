export interface PuntoEmisionOperarioInterface {
  novedadInicio?: string;
  novedadCierre?: string;
  fechaHoraInicio?: string;
  fechaHoraCierre?: string;
  valorInicia?: number;
  valorCierra?: number;
  valorCuadre?: number;
  valorNoCuadra?: number;
  habilitado?: boolean;
  estado?: string;
  operario?: any;
  puntoEmision?: any;
  administradorEstablecimiento?: any;
  kardexCajas?: any[];
  id?: number;
}
