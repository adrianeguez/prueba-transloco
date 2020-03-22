import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { TipoVendedorInterface } from '../../../../../../../submodulo-vendedor-front/interfaces/tipo-vendedor-interface';
import { TipoVendedorRestService } from '../../../../../../../submodulo-vendedor-front/servicios/rest/tipo-vendedor-rest.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-tipo-vendedores',
  templateUrl: './filter-tipo-vendedores.component.html',
  styleUrls: ['./filter-tipo-vendedores.component.scss'],
})
export class FilterTipoVendedoresComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() tipoVendedorEncontrado: EventEmitter<
    [TipoVendedorInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _tipoVendedorRestService: TipoVendedorRestService,
  ) {}

  ngOnInit() {
    this.buscarTipoVendedor();
  }

  buscarTipoVendedorPorCodigo() {
    let tipoImpuesto$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      tipoImpuesto$ = this._tipoVendedorRestService.findAll(
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
      tipoImpuesto$ = this._tipoVendedorRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    tipoImpuesto$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.tipoVendedorEncontrado.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarTipoVendedor() {
    this._cargandoService.habilitarCargando();
    this.buscarTipoVendedorPorCodigo();
  }
}
