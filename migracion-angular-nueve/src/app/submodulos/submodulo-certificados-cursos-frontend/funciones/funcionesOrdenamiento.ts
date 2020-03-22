import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

function ordenarRecursivo(
  primerElemento: any,
  listaObjetos: any[],
  listaOrdenada: any[],
  nombreCriterio: string,
) {
  if (primerElemento[nombreCriterio]) {
    const elementoEncontradoSegunCriterio = buscarElementoPorId(listaObjetos, primerElemento[nombreCriterio].id);
    const tieneIdSegunCriterio = !!elementoEncontradoSegunCriterio;
    if (tieneIdSegunCriterio) {
      const idValido = elementoEncontradoSegunCriterio.id !== primerElemento.id;
      if (idValido) {
        listaOrdenada.push(elementoEncontradoSegunCriterio);
        ordenarRecursivo(elementoEncontradoSegunCriterio, listaObjetos, listaOrdenada, nombreCriterio);
      } else {
        return listaObjetos;
      }

    }
  }
  return listaOrdenada;
}

function buscarPrimerElemento(elementos: any[], nombreCriterioAnterior) {
  return elementos.find(
    (elemento) => {
      return elemento[nombreCriterioAnterior] === null;
    }
  );
}

export function ordenarElementos(nombreCriterio: string, nombreCriterioAnterior: string) {
  return mergeMap(
    (elementosFormateadas: any[]) => {
      const elementoInicial = buscarPrimerElemento(elementosFormateadas, nombreCriterioAnterior);
      if (elementoInicial) {
        const elementosOrdenados = [elementoInicial];
        ordenarRecursivo(elementoInicial, elementosFormateadas, elementosOrdenados, nombreCriterio);
        if (elementosOrdenados.length !== elementosFormateadas.length) {
          return of(elementosFormateadas);
        }
        return of(elementosOrdenados);
      } else {
        return of(elementosFormateadas);
      }
    }
  );
}

export function ordenarElementosSinMergeMap(elementos: any[], nombreCriterio: string, nombreCriterioAnterior: string) {
  const elementoInicial = buscarPrimerElemento(elementos, nombreCriterioAnterior);
  const elementosOrdenados = [elementoInicial];
  ordenarRecursivo(elementoInicial, elementos, elementosOrdenados, nombreCriterio);
  return of(elementosOrdenados);
}

function buscarElementoPorId(
  listaElementos: any[],
  id: number): any {
  return listaElementos.find(
    (elemento: any) => {
      return elemento.id === +id;
    }
  );
}
