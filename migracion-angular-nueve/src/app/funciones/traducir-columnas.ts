import {TranslocoService} from '@ngneat/transloco';

export function traducirColumnas(servicioTransloco: TranslocoService, rutaTabla: string, columnas: any[]) {
  servicioTransloco.selectTranslateObject(rutaTabla)
    .subscribe(
      (objetoTraducido) => {
        console.log(objetoTraducido);
        columnas = columnas.map(
          (columna: { field: string; header: string; llaveATraducir: string; traduccion: string }) => {
            console.log(columna.llaveATraducir);
            columna.traduccion = objetoTraducido[columna.llaveATraducir];
            console.log(columna);
            return columna;
          }
        );
      }
    );
}
