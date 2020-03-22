import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ESTADOS} from '../../../../../../../enums/estados';
import {ContactoEmpresaInterface} from '../../../../../interfaces/contacto-empresa.interface';

@Component({
  selector: 'ml-tabla-contactos-empresa',
  templateUrl: './tabla-contactos-empresa.component.html',
  styleUrls: ['./tabla-contactos-empresa.component.scss']
})
export class TablaContactosEmpresaComponent implements OnInit {

  rows = 5;

  estados = ESTADOS;

  skip = 0;
  arregloContactos: ContactoEmpresaInterface[] = [];

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() contactosEncontrados: ContactoEmpresaInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() contactosSeleccionados: EventEmitter<ContactoEmpresaInterface[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerArticuloSeleccionado(event) {
    this.arregloContactos.push(event.data);
    this.contactosSeleccionados.emit(this.arregloContactos);
  }

  quitarSeleccion(evento) {
    const preguntaEnArreglo = this.arregloContactos
      .find(
        arreglo => evento.data.id === arreglo.id
      );
    const indicePRegunta = this.arregloContactos.indexOf(preguntaEnArreglo);
    this.arregloContactos.splice(indicePRegunta, 1);
    this.contactosSeleccionados.emit(this.arregloContactos);
  }

}
