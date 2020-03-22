import { TreeNode } from 'primeng/api';
import { generarDiccionarioArbol } from './generar-diccionario';

export function compararArboles(arbolOriginal: TreeNode[]) {
  const diccionario = [];
  const arreglo = [];
  arbolOriginal.forEach((nodoOriginal: any, indiceI) => {
    const temp = [];
    temp.push(generarDiccionarioArbol(nodoOriginal, diccionario).splice(0));
    arreglo.push(temp);
  });
  console.log('arreglo final', arreglo);
  return arreglo;
}
