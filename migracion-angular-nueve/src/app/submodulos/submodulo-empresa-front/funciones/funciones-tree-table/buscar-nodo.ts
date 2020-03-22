import { TreeNode } from 'primeng/api';
import { buscarCoincidencias } from './buscar-coindicencias';
import { expandirNodoEncontrado } from './expandir-nodo-encontrado';

export function buscarNodo(
  arbol: TreeNode[],
  busqueda,
  campos,
  objetoABuscar?,
) {
  const arbolConCoincidencias = buscarCoincidencias(
    arbol,
    busqueda,
    campos,
    objetoABuscar,
  );
  expandirNodoEncontrado(arbolConCoincidencias);
}
