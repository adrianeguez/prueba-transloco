import { EmpresaClientesInterface } from './empresa-clientes.interface';

export interface CalificacionClienteInterface {
  id?: number;
  calificacion?: number;
  observacion?: string;
  empresaCliente?: EmpresaClientesInterface | number | string;
}
