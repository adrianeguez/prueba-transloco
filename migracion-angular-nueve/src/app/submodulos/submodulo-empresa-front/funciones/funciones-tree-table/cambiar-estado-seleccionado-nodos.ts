import { TreeNode } from 'primeng/api';

export function cambiarEstadoSeleccionadoTreeTable(arbol: TreeNode[]) {
  arbol.forEach(nodo => {
    if (nodo.data.nodoCoincide) {
      nodo.data.nodoCoincide = !nodo.data.nodoCoincide;
    }
    if (nodo.children) {
      cambiarEstadoSeleccionadoTreeTable(nodo.children);
    }
  });
  return arbol;
}
