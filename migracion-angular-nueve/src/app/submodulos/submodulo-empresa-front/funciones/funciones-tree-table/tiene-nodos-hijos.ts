import { TreeNode } from 'primeng/api';

export function tieneNodosHijos(nodo: TreeNode) {
  return nodo.children && nodo.children.length > 0;
}
