import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { ArticulosRestService } from '../../../../../../../submodulo-articulos-front/servicios/rest/articulos-rest.service';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { ArticuloInterface } from '../../../../../../../submodulo-articulos-front/interfaces/articulo.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-articulos',
  templateUrl: './filter-articulos.component.html',
  styleUrls: ['./filter-articulos.component.scss'],
})
export class FilterArticulosComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() articulosEncontradas: EventEmitter<
    [ArticuloInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
  ) {}

  ngOnInit() {
    this.buscarArticuloPorNombreCodigoEstado();
  }

  buscarArticuloPorNombreCodigoEstado() {
    let articulo$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      articulo$ = this._articulosRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    } else {
      this._cargandoService.habilitarCargando();
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      consulta.where = {
        codigo: this.busqueda,
      };
      articulo$ = this._articulosRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    articulo$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.articulosEncontradas.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarArticulo() {
    this._cargandoService.habilitarCargando();
    this.buscarArticuloPorNombreCodigoEstado();
  }
}
