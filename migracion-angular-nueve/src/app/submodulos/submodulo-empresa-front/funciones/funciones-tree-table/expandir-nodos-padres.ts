import { TreeNode } from 'primeng/api';

export function expandirNodosPadres(nodo: TreeNode) {
  nodo.expanded = true;
  if (nodo.parent) {
    expandirNodosPadres(nodo.parent);
  }
}
