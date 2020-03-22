import { TreeNodeCustom } from '../rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';

export function generarDiccionarioArbol(
  nodo: TreeNodeCustom,
  diccionario: number[],
) {
  diccionario.push(nodo.id);
  if (nodo.children) {
    nodo.children.forEach((nodoValor: TreeNodeCustom) => {
      return generarDiccionarioArbol(nodoValor, diccionario);
    });
  }
  return diccionario;
}
