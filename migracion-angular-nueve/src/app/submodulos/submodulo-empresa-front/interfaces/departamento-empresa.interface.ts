import { EmpresaInterface } from './empresa.interface';
import { DepartamentoTrabajadorInterface } from './departamento-trabajador.interface';

export interface DepartamentoEmpresaInterface {
  id?: number;
  nombre?: string;
  descripcion?: string;
  nivel?: number;
  habilitado?: number | boolean;
  empresa?: EmpresaInterface | number | string;
  departamentosEmpresaHijos?: DepartamentoEmpresaInterface[];
  departamentoEmpresaPadre?: DepartamentoEmpresaInterface | number | string;
  departamentosTrabajador?: DepartamentoTrabajadorInterface[];
}
