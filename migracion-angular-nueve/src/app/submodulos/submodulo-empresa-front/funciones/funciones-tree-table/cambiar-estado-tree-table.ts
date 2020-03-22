import { TreeNode } from 'primeng/api';

export function cambiarEstadoTreeTable(
  arbol: TreeNode[],
  propiedad: string,
  estado: boolean,
) {
  arbol.forEach(nodo => {
    nodo[propiedad] = estado;
    if (nodo.children) {
      cambiarEstadoTreeTable(nodo.children, propiedad, estado);
    }
  });
  return arbol;
}
