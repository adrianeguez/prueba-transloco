import { TreeNodeCustom } from '../rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';

export function verificarNodoMovidoEsHijo(
  nodoOrigen: TreeNodeCustom,
  nodoDestino: TreeNodeCustom,
) {
  return nodoDestino.children.some(
    (nodo: TreeNodeCustom) => nodo.id === nodoOrigen.id,
  );
}
