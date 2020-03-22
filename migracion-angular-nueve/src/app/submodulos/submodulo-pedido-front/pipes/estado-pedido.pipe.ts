import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'estadoPedido'})
export class EstadoPedidoPipe implements PipeTransform {
  transform(acronimoEstado: string, nombreEstado?: string): string {
    if (acronimoEstado === 'CR') {
      return 'Creado';
    }
    if (acronimoEstado === 'DA') {
      return 'Dado de baja';
    }
    if (acronimoEstado === 'EN') {
      return 'Entregado';
    }
    if (acronimoEstado === 'PA') {
      return 'Parcial';
    }
    if (acronimoEstado === 'PE') {
      return 'Pendiente';
    }
  }
}
