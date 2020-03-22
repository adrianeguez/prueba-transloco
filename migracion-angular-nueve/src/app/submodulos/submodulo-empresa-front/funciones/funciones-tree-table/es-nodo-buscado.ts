import { TreeNode } from 'primeng/api';

export function esNodoBuscado(
  nodo: TreeNode,
  busqueda: string,
  campos: string[],
  objetoABuscar?,
) {
  const nodoABuscar = objetoABuscar ? nodo.data[objetoABuscar] : nodo.data;
  const nodoCoindiceConBusqueda = campos.filter(campo => {
    const esCampoValido =
      nodoABuscar[campo] !== null && nodoABuscar[campo] !== undefined;
    if (esCampoValido) {
      return (
        nodoABuscar[campo]
          .toString()
          .toLowerCase()
          .search(busqueda.toString().toLowerCase()) !== -1
      );
    }
  });
  return nodoCoindiceConBusqueda.length > 0;
}
