import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EstadosPedidoInterface} from '../../../interfaces/estados-pedido.interface';

@Component({
  selector: 'ml-select-estado-pedido',
  templateUrl: './select-estado-pedido.component.html',
  styleUrls: ['./select-estado-pedido.component.scss']
})
export class SelectEstadoPedidoComponent implements OnInit {

  @Input()
  movimiento: string;

  estadosPedidos: EstadosPedidoInterface[];

  estadoPedido: EstadosPedidoInterface;

  @Output() estadoAFiltrar: EventEmitter<EstadosPedidoInterface> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (this.movimiento === 'Ingreso' ||
      this.movimiento === 'Egreso' ||
      this.movimiento === 'Transferencia' ||
      this.movimiento === 'Compra') {
      this.estadosPedidos = [
        {nombre: 'Creado', acronimo: 'CR'},
        {nombre: 'Entregado', acronimo: 'EN'},
      ];
    } else {
      this.estadosPedidos = [
        {nombre: 'Creado', acronimo: 'CR'},
        {nombre: 'Dado de baja', acronimo: 'DA'},
        {nombre: 'Entregado', acronimo: 'EN'},
        {nombre: 'Parcial', acronimo: 'PA'},
        {nombre: 'Pendiente', acronimo: 'PE'},
      ];
    }
  }

  enviarEstadoAFiltrar() {
    this.estadoAFiltrar.emit(this.estadoPedido);
  }

}
