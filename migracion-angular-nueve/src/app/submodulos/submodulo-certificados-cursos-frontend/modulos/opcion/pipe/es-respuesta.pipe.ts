import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'YESNOPipe'})
export class EsRespuestaPipe implements PipeTransform {
  transform(value: number, exponent?: number): string {
    return (value) ? 'YES' : 'NO';
  }
}
