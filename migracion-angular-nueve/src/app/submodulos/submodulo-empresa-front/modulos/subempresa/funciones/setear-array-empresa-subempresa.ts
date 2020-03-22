import { setearEmpresaSubempresa } from './setear-empresa-subempresa';
import { SubempresaInterface } from '../../../interfaces/subempresa.interface';

export function setearArrayEmpresaSubempresa(
  subempresas: SubempresaInterface[],
) {
  return subempresas.map(subempresa => {
    return setearEmpresaSubempresa(subempresa);
  });
}
