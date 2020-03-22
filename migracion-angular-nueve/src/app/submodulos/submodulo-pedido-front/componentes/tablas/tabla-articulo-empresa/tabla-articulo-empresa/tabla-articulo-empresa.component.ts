import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ArticuloInterface} from '../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {ESTADOS} from '../../../../../../enums/estados';

@Component({
  selector: 'ml-tabla-articulo-empresa',
  templateUrl: './tabla-articulo-empresa.component.html',
  styleUrls: ['./tabla-articulo-empresa.component.scss']
})
export class TablaArticuloEmpresaComponent implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() articulosEncontrados: ArticuloInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() articuloSeleccionado: EventEmitter<ArticuloInterface> = new EventEmitter();

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
    this.articuloSeleccionado.emit(event.data);
  }
}
