import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'arregloNombres'})
export class ArregloPruebasPipe implements PipeTransform {
  transform(value: any [], ...args: any[]): any {
    const arregloNombresPrueba: string [] = [];

    const stringPruebas = '';
    value.forEach(
      (registro) => {
        if (registro) {
          arregloNombresPrueba.push(registro.nombre);
        }
      }
    );
    if (arregloNombresPrueba.length > 0) {
      return arregloNombresPrueba.join('\n');
    } else {
      return '(Not assigned)';
    }
  }
}
