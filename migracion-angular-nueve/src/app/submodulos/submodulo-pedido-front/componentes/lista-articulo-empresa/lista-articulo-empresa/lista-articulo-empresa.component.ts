import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ArticuloInterface} from '../../../../submodulo-articulos-front/interfaces/articulo.interface';
import {
  FilterArticuloEmpresaComponent
} from '../../filters/filter-articulo-empresa/filter-articulo-empresa/filter-articulo-empresa.component';
import {ArticuloPorBodegaRestService} from '../../../servicios/rest/articulo-por-bodega/articulo-por-bodega-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ArticuloPorBodegaInterface} from '../../../servicios/rest/articulo-por-bodega/interfaces/articulo-por-bodega.interface';
import {ArticuloEmpresaInterface} from '../../../interfaces/articulo-empresa.interface';

@Component({
  selector: 'ml-lista-articulo-empresa',
  templateUrl: './lista-articulo-empresa.component.html',
  styleUrls: ['./lista-articulo-empresa.component.scss']
})
export class ListaArticuloEmpresaComponent implements OnInit {

  @ViewChild(FilterArticuloEmpresaComponent, {static: true})
  filterArticuloEmpresa: FilterArticuloEmpresaComponent;

  @Input() idProveedor: number;

  @Input() esCompra;
  @Input() idEstablecimiento;
  @Input() idEmpresa;
  @Input() idBodega;
  @Input() esVenta;
  @Input() idBodegaDestino: number;

  totalRegistros: number;

  articulosEncontrados: ArticuloInterface[] = [];

  columnas = [
    {field: 'codigo', header: 'Código'},
    {field: 'nombre', header: 'Nombre'},
    {field: 'descripcion', header: 'Descripción'},
  ];

  @Output() articuloSeleccionado: EventEmitter<ArticuloInterface> = new EventEmitter();

  constructor(
    private readonly _articuloPorBodegaRestService: ArticuloPorBodegaRestService
  ) {
  }

  ngOnInit() {
  }

  setearArticulosEmpresa(articulosPorEmpresa: [any[], number]) {
    this.articulosEncontrados = articulosPorEmpresa[0];
    this.totalRegistros = articulosPorEmpresa[1];
  }

  setearSkip(skip) {
    this.filterArticuloEmpresa.skip = skip;
    this.filterArticuloEmpresa.buscarArticuloPorNombreCodigo();
  }

  obtenerArticuloEmpresaSeleccionado(eventoArticulo: ArticuloInterface) {
    this.articuloSeleccionado.emit(eventoArticulo);
  }
}
