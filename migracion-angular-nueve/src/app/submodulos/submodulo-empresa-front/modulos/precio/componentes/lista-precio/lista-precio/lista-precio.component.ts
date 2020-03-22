import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterPrecioComponent} from '../../filter-precio/filter-precio/filter-precio.component';
import {PreciosInterface} from '../../../../../interfaces/precios.interface';
import {PreciosRestService} from '../../../../../servicios/rest/precios-rest.service';
import {traducirColumnas} from '../../../../../../../funciones/traducir-columnas';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'ml-lista-precio',
  templateUrl: './lista-precio.component.html',
  styleUrls: ['./lista-precio.component.scss']
})
export class ListaPrecioComponent implements OnInit {

  @ViewChild(FilterPrecioComponent, {static: true})
  filterPrecio: FilterPrecioComponent;

  @Input() idArticuloEmpresa: number;
  totalRegistros: number;

  preciosEncontrados: PreciosInterface[] = [];
  rutaTraduccion;

  columnas = [
    {field: 'esPrincipal', header: 'Es principal', llaveATraducir: 'esPrincipal', traduccion: ''},
    {field: 'valor', header: 'Valor', llaveATraducir: 'valor', traduccion: ''},
  ];
  @Output() precioSeleccionado: EventEmitter<PreciosInterface> = new EventEmitter();

  constructor(
    private readonly _preciosRestService: PreciosRestService,
    private readonly _translocoService: TranslocoService,
  ) {
  }

  ngOnInit() {
    this.rutaTraduccion = 'submoduloEmpresa.moduloPrecio.componentes.listaPrecios';
    traducirColumnas(this._translocoService, `${this.rutaTraduccion}.tablas`, this.columnas);
  }

  setearPreguntas(precios: [PreciosInterface[], number]) {
    this.preciosEncontrados = precios[0];
    this.totalRegistros = precios[1];
  }

  setearSkip(skip) {
    this.filterPrecio.skip = skip;
    this.filterPrecio.buscarPrecio();
  }

  obtenerPrecioSeleccionado(evento: PreciosInterface) {
    this.precioSeleccionado.emit(evento);
  }

}
