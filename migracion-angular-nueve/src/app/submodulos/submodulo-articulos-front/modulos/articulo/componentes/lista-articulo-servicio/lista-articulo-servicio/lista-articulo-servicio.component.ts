import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ArticuloInterface} from '../../../../../interfaces/articulo.interface';
import {FilterArticuloServicioComponent} from '../../filter-articulo-servicio/filter-articulo-servicio/filter-articulo-servicio.component';
import {TranslocoService} from '@ngneat/transloco';
import {traducirColumnas} from '../../../../../../../funciones/traducir-columnas';

@Component({
  selector: 'ml-lista-articulo-servicio',
  templateUrl: './lista-articulo-servicio.component.html',
  styleUrls: ['./lista-articulo-servicio.component.scss']
})
export class ListaArticuloServicioComponent implements OnInit {

  @ViewChild(FilterArticuloServicioComponent, {static: true})
  filterArticuloEmpresa: FilterArticuloServicioComponent;
  @Input() idEmpresa: number;

  totalRegistros: number;

  articulosEncontrados: ArticuloInterface[] = [];
  rutaTraduccion = 'submoduloArticulos.articulo.componentes.listaArticuloServicio';

  columnas = [
    {field: 'codigo', header: 'Código', llaveATraducir: 'codigo', traduccion: ''},
    {field: 'nombre', header: 'Nombre', llaveATraducir: 'nombre', traduccion: ''},
    {field: 'descripcion', header: 'Descripción', llaveATraducir: 'descripcion', traduccion: ''},
  ];

  @Output() articuloSeleccionado: EventEmitter<ArticuloInterface[]> = new EventEmitter();

  constructor(
    private readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit() {
    traducirColumnas(this._translocoService, this.rutaTraduccion + '.tablas', this.columnas);
  }

  setearArticulosEmpresa(articulosPorEmpresa: [any[], number]) {
    this.articulosEncontrados = articulosPorEmpresa[0];
    this.totalRegistros = articulosPorEmpresa[1];
  }

  setearSkip(skip) {
    this.filterArticuloEmpresa.skip = skip;
    this.filterArticuloEmpresa.buscar('');
  }

  obtenerArticuloEmpresaSeleccionado(eventoArticulo: ArticuloInterface[]) {
    this.articuloSeleccionado.emit(eventoArticulo);
  }

}
