import { TreeNodeCustom } from '../rutas/ruta-gestion-menu-lateral/ruta-gestion-menu-lateral.component';

export function actualizarNodosHijos(
  nodoOrigen: TreeNodeCustom,
  event,
  nivelDestino,
) {
  const nodoOrigenNivel = nodoOrigen.nivel;
  nodoOrigen.nivel = nivelDestino + 1;
  if (
    (nivelDestino === 1 && event.dropIndex) ||
    (nivelDestino === 1 && event.dropIndex === 0)
  ) {
    console.log('entro en condicion 1');
    nodoOrigen.nivel = 1;
  }
  if (event.dropIndex === 0 && nivelDestino !== 1) {
    console.log('entro en condicion 2');
    nodoOrigen.nivel = nivelDestino;
  }
  if (
    (nivelDestino === nodoOrigenNivel && !event.dropIndex) ||
    (nivelDestino === nodoOrigenNivel && event.index === -1)
  ) {
    console.log('entro en condicion 3');
    nodoOrigen.nivel = nivelDestino + 1;
  }
  if (nivelDestino === nodoOrigenNivel && event.dropIndex) {
    console.log('entro en condicion 4');
    nodoOrigen.nivel = nivelDestino;
  }
  if (
    (nivelDestino === nodoOrigenNivel && event.index) ||
    (nivelDestino === nodoOrigenNivel && event.index === 0)
  ) {
    console.log('entro en condicion 5');
    nodoOrigen.nivel = nivelDestino;
  }
  console.log(' nodo origen nivellabe;: ', nodoOrigen.label, nodoOrigen.nivel);
  if (nodoOrigen.children.length > 0) {
    // tslint:disable-next-line:max-line-length
    nodoOrigen.children.forEach((valor: TreeNodeCustom, indice) => {
      valor.nivel = nodoOrigen.nivel + 1;
      if (valor.children.length > 0) {
        const evento = Object.assign({}, event);
        if (evento.dropIndex === 0) {
          evento.index = -1;
        }
        return actualizarNodosHijos(valor, evento, valor.nivel);
      }
    });
    return nodoOrigen;
  } else {
    return nodoOrigen;
  }
}
