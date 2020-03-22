import { TreeNodeCustom } from '../rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';

export function obtenerNodoRaiz(nodoOrigen: TreeNodeCustom) {
  if (!nodoOrigen.parent) {
    return nodoOrigen.id;
  } else {
    return obtenerNodoRaiz(nodoOrigen.parent);
  }
}
