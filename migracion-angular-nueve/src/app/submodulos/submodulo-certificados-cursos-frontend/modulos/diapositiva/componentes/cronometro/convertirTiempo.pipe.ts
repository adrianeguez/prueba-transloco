import { Pipe, PipeTransform } from '@angular/core';
import {transformarSegundosATiempo} from '../../funciones/funciones.tiempo';
@Pipe({name: 'convertirATiempo'})
export class ConvertirTiempoPipe implements PipeTransform {
  transform(value: number, exponent?: number): string {
    return transformarSegundosATiempo(value);
  }
}
