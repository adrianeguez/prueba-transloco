import { generarNodo } from './generar-nodo';

export function generarArrayNodos(values) {
  return values.map(valor => {
    return generarNodo(valor);
  });
}
