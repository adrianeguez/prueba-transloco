import { cambiarEstadoTreeTable } from './cambiar-estado-tree-table';
import { buscarNodo } from './buscar-nodo';

export function escucharBusquedaArbol(
  treeTable,
  busqueda,
  camposABuscar,
  objetoABuscar?,
) {
  let arbol = cambiarEstadoTreeTable(treeTable, 'expanded', false);
  arbol = cambiarEstadoTreeTable(arbol, 'partialSelected', false);
  buscarNodo(arbol, busqueda, camposABuscar, objetoABuscar);
}
