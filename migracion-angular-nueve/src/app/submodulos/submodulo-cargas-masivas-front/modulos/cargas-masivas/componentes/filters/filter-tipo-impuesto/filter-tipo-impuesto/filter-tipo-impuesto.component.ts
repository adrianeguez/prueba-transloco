import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { TipoImpuestoInterface } from '../../../../../../../submodulo-articulos-front/interfaces/tipo-impuesto.interface';
import { TipoImpuestoRestService } from '../../../../../../../submodulo-articulos-front/servicios/rest/tipo-impuesto-rest.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-tipo-impuesto',
  templateUrl: './filter-tipo-impuesto.component.html',
  styleUrls: ['./filter-tipo-impuesto.component.scss'],
})
export class FilterTipoImpuestoComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() tipoImpuestoEncontrado: EventEmitter<
    [TipoImpuestoInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _tipoImpuestoRestService: TipoImpuestoRestService,
  ) {}

  ngOnInit() {
    this.buscarTipoImpuesto();
  }

  buscarTipoImpuestoPorCodigoSRI() {
    let tipoImpuesto$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      tipoImpuesto$ = this._tipoImpuestoRestService.findAll(
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
        codigoSri: this.busqueda,
      };
      tipoImpuesto$ = this._tipoImpuestoRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    tipoImpuesto$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.tipoImpuestoEncontrado.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarTipoImpuesto() {
    this._cargandoService.habilitarCargando();
    this.buscarTipoImpuestoPorCodigoSRI();
  }
}
