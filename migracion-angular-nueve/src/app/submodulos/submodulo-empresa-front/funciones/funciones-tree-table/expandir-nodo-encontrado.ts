import { TreeNode } from 'primeng/api';
import { expandirNodosPadres } from './expandir-nodos-padres';

export function expandirNodoEncontrado(arbol: TreeNode[]) {
  arbol.forEach(nodo => {
    if (nodo.partialSelected && nodo.parent) {
      expandirNodosPadres(nodo.parent);
      if (nodo.children.length > 0) {
        expandirNodoEncontrado(nodo.children);
      }
    } else if (nodo.children.length > 0) {
      expandirNodoEncontrado(nodo.children);
    }
  });
}
