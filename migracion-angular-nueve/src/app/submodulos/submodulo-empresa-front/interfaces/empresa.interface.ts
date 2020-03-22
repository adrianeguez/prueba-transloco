import { EdificioInterface } from './edificio.interface';
import { ContactoEmpresaInterface } from './contacto-empresa.interface';
import { InformacionTributariaInterface } from './informacion-tributaria.interface';

export interface EmpresaInterface {
  id?: number;
  nombreComercial?: string;
  razonSocial?: string;
  ruc?: string;
  direccionMatriz?: string;
  telefono?: string;
  correo?: string;
  tipoContribuyente?: string;
  habilitado?: number | boolean;
  contribuyenteEspecial?: string;
  obligadoContabilidad?: number | boolean;
  edificios?: EdificioInterface[];
  contactosEmpresa?: ContactoEmpresaInterface[];
  tipo?: string;
  esEstacionServicioPropia?: number | boolean;
  codigo?: string;
  informacionTributaria?: InformacionTributariaInterface | number | string;
}
