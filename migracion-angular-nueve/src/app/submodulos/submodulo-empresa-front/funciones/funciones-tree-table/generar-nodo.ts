import { TreeNode } from 'primeng/api';

export function generarNodo(registro): TreeNode {
  const leaf = false;
  return {
    data: registro,
    leaf,
    children: [],
  };
}
