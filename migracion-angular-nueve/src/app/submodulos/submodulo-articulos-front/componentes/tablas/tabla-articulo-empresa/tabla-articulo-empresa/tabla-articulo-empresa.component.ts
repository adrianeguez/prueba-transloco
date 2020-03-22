import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { ArticuloEmpresaInterface } from './../../../../interfaces/articulo-empresa.interface';
import { ESTADOS } from './../../../../../../enums/estados';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NUMERO_FILAS_ARTICULO_EMPRESA } from '../../../../constantes/numero-filas-articulos-empresa';

@Component({
  selector: 'ml-tabla-articulo-empresa',
  templateUrl: './tabla-articulo-empresa.component.html',
  styleUrls: ['./tabla-articulo-empresa.component.scss'],
})
export class TablaArticuloEmpresaComponent implements OnInit {
  rows = NUMERO_FILAS_ARTICULO_EMPRESA;

  arregloArticulos: ArticuloInterface[] = [];

  estados = ESTADOS;

  skip = 0;

  @Input() columnas;

  @Input() totalRegistros: number;

  loading = false;

  @Input() articulosEncontradas: ArticuloInterface[] = [];

  @Output() emitirSkip: EventEmitter<number> = new EventEmitter();

  @Output() articulosSeleccionado: EventEmitter<
    ArticuloInterface[]
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.skip = event.first;
    this.emitirSkip.emit(event.first);
    this.loading = false;
  }

  obtenerArticuloSeleccionado(event) {
    this.arregloArticulos.push(event.data);
    this.articulosSeleccionado.emit(this.arregloArticulos);
  }

  articuloDeseleccionado(event) {
    const articuloEnArreglo = this.arregloArticulos.find(
      arreglo => event.data.id === arreglo.id,
    );
    const indiceArreglo = this.arregloArticulos.indexOf(articuloEnArreglo);
    this.arregloArticulos.splice(indiceArreglo, 1);
    this.articulosSeleccionado.emit(this.arregloArticulos);
  }
}
