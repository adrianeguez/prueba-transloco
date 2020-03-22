import { TreeNode } from 'primeng/api';
import { generarNodo } from './generar-nodo';

export function llenarArbolConRegistro(nodoPadre: TreeNode, campo: string) {
  if (nodoPadre.data[campo]) {
    nodoPadre.data[campo].forEach(registroHijo => {
      const nodo = generarNodo(registroHijo);
      nodo.parent = nodoPadre;
      nodoPadre.children.push(nodo);
      llenarArbolConRegistro(nodo, campo);
    });
  }
}
