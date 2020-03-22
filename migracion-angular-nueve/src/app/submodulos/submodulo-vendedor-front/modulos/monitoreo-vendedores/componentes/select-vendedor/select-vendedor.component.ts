import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ml-select-vendedor',
  templateUrl: './select-vendedor.component.html',
  styleUrls: ['./select-vendedor.component.scss'],
})
export class SelectVendedorComponent implements OnInit {
  @Input() vendedores = [];
  @Output() seteoEnviarVendedores: EventEmitter<any[]> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  enviarVendedoreSeleccionado(event) {
    this.seteoEnviarVendedores.emit(event.value);
  }
}
