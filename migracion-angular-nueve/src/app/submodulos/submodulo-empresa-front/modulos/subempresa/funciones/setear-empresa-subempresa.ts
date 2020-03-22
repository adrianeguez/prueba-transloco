import { EmpresaSubempresaInterface } from '../interfaces/empresa-subempresa.interface';
import { SubempresaInterface } from '../../../interfaces/subempresa.interface';
import { EmpresaInterface } from '../../../interfaces/empresa.interface';

export function setearEmpresaSubempresa(subempresa: SubempresaInterface) {
  const empresaSubempresa: EmpresaSubempresaInterface = {};
  empresaSubempresa.empresaActual = subempresa.empresaHijo as EmpresaInterface;
  empresaSubempresa.habilitado = subempresa.habilitado;
  empresaSubempresa.id = subempresa.id;
  empresaSubempresa.nivel = subempresa.nivel;
  return empresaSubempresa;
}
