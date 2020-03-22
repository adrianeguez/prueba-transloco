import {MigaDePanInterface} from '@manticore-labs/ng-api';
import {of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

export function traducirMigasImplicito(
  migas: MigaDePanInterface[],
  clase: any
) {
  clase.migasDePan = [];
  return of(...migas).pipe(
    mergeMap(
      (miga: MigaDePanInterface) => {
        return clase._translocoService
          .selectTranslate(miga.nombre)
          .pipe(
            map(
              (traduccion) => {
                return {
                  nombre: traduccion,
                  ruta: miga.ruta,
                };
              }
            )
          );
      }
    )
  );
}

export function traducirMigas<Clase>(contexto: Clase | any, rutas: MigaDePanInterface[]) {
  // contexto.migasDePan = [];
  const a = traducirMigasImplicito(rutas, contexto)
    .subscribe(
      (valor) => {
        // console.log([...contexto.migasDePan]);
        contexto.migasDePan = reemplazar(contexto.migasDePan, valor);
      }
    );
}

function reemplazar(lista: MigaDePanInterface[], migas: any) {
  // console.log(lista, migas);
  const listaIterar = [...lista];
  const indice = listaIterar.findIndex(
    (miga) => {
      return migas.ruta.join() === miga.ruta.join();
    }
  );
  if (indice !== -1) {
    listaIterar[indice] = migas;
  } else {
    listaIterar.push(migas);
  }
  return listaIterar;
}
