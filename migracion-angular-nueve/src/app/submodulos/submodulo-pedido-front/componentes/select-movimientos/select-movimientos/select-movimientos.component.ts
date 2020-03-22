import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectMovimientoInterface} from '../../../interfaces/select-movimiento.interface';

@Component({
  selector: 'ml-select-movimientos',
  templateUrl: './select-movimientos.component.html',
  styleUrls: ['./select-movimientos.component.scss']
})
export class SelectMovimientosComponent implements OnInit {

  movimientos: SelectMovimientoInterface[];

  movimiento: SelectMovimientoInterface;

  @Output() movimientoSeleccionado: EventEmitter<SelectMovimientoInterface> = new EventEmitter();

  constructor() {
    this.movimientos = [
      { nombre: 'Ingreso', codigo: '01' },
      { nombre: 'Egreso', codigo: '05' },
      { nombre: 'Transferencia', codigo: '10' },
      { nombre: 'Compra a proveedores', codigo: '11' },
      // { nombre: 'Venta', codigo: '22' }
    ];
  }

  ngOnInit() {
  }

  enviarMovimientoSeleccionado() {
    this.movimientoSeleccionado.emit(this.movimiento);
  }

}
