import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ESTADOS} from '../../../../../../../enums/estados';
import {PreguntaInterface} from '../../../../../../submodulo-certificados-cursos-frontend/modulos/pregunta/interfaces/pregunta.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {PreciosInterface} from '../../../../../interfaces/precios.interface';

@Component({
  selector: 'ml-tabla-precio',
  templateUrl: './tabla-precio.component.html',
  styleUrls: ['./tabla-precio.component.scss']
})
export class TablaPrecioComponent implements OnInit {

  rows = NUMERO_FILAS_TABLAS / 2;

  estados = ESTADOS;

  skip = 0;
  arregloPrecios: PreciosInterface[] = [];

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() preciosEncontrados: PreciosInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() precioSeleccionado: EventEmitter<PreciosInterface> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }
  obtenerPrecioSeleccionado(event) {
    // this.arregloPrecios.push(event.data);
    this.precioSeleccionado.emit(event.data);
  }

}
