import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ml-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @Output()
  seleccionoDatosCliente: EventEmitter<
    DatosClientesInterface
  > = new EventEmitter();

  @Input()
  datosCliente: DatosClientesInterface;

  formulario: DatosClientesInterface = {
    numeroPedido: undefined,
    observacion: undefined,
    comentario: undefined,
  };

  constructor() {}

  ngOnInit() {
    if (this.datosCliente) {
      this.formulario.observacion = this.datosCliente.observacion;
      this.formulario.comentario = this.datosCliente.comentario;
    }
  }

  emitirDatosClienteSeleccionados(formulario: NgForm) {
    this.seleccionoDatosCliente.emit(this.formulario);
  }
}

export interface DatosClientesInterface {
  numeroPedido?: any;
  observacion?: string;
  comentario?: string;
}
