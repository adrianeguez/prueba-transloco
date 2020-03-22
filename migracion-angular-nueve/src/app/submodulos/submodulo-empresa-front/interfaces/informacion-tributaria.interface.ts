import { EmpresaInterface } from './empresa.interface';

export interface InformacionTributariaInterface {
  documento?: string;
  razonSocial?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  obligadoContabilidad?: number | boolean;
  contribuyenteEspecial?: number;
  tipoContribuyente?: string;
  esMatriz?: boolean;
  habilitado?: boolean;
  id?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  empresa?: EmpresaInterface | number | string;
}
