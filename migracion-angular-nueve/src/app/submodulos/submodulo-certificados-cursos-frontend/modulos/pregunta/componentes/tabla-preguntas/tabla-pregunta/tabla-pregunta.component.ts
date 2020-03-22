import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ESTADOS} from '../../../../../../../enums/estados';
import {ArticuloInterface} from '../../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {PreguntaInterface} from '../../../interfaces/pregunta.interface';

@Component({
  selector: 'ml-tabla-pregunta',
  templateUrl: './tabla-pregunta.component.html',
  styleUrls: ['./tabla-pregunta.component.scss']
})
export class TablaPreguntaComponent implements OnInit {

  rows = 5;

  estados = ESTADOS;

  skip = 0;
  arregloPreguntas: PreguntaInterface[] = [];

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() preguntasEncontradas: PreguntaInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() preguntasSeleccionada: EventEmitter<PreguntaInterface[]> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerArticuloSeleccionado(event) {
    this.arregloPreguntas.push(event.data);
    this.preguntasSeleccionada.emit(this.arregloPreguntas);
  }

  quitarSeleccion(evento) {
    const preguntaEnArreglo = this.arregloPreguntas
      .find(
        arreglo => evento.data.id === arreglo.id
      );
    const indicePRegunta = this.arregloPreguntas.indexOf(preguntaEnArreglo);
    this.arregloPreguntas.splice(indicePRegunta, 1);
    this.preguntasSeleccionada.emit(this.arregloPreguntas);
  }
}
