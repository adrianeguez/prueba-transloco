import { TreeNode } from 'primeng/api';
import { esNodoBuscado } from './es-nodo-buscado';
import { tieneNodosHijos } from './tiene-nodos-hijos';

export function buscarCoincidencias(
  arbol: TreeNode[],
  criterioBusqueda,
  campos,
  objetoABuscar?,
): TreeNode[] {
  arbol.forEach(nodo => {
    if (esNodoBuscado(nodo, criterioBusqueda, campos, objetoABuscar)) {
      nodo.partialSelected = true;
      nodo.data.nodoCoincide = true;
      if (tieneNodosHijos(nodo)) {
        buscarCoincidencias(
          nodo.children,
          criterioBusqueda,
          campos,
          objetoABuscar,
        );
      }
    } else if (tieneNodosHijos(nodo)) {
      buscarCoincidencias(
        nodo.children,
        criterioBusqueda,
        campos,
        objetoABuscar,
      );
    }
  });
  return arbol;
}
