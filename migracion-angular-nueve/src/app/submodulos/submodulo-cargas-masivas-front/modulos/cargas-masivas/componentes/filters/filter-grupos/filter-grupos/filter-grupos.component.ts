import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { GrupoInterface } from '../../../../../../../submodulo-articulos-front/interfaces/grupo.interface';
import { GrupoRestService } from '../../../../../../../submodulo-articulos-front/servicios/rest/grupo-rest.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-grupos',
  templateUrl: './filter-grupos.component.html',
  styleUrls: ['./filter-grupos.component.scss'],
})
export class FilterGruposComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() grupoEncontrado: EventEmitter<
    [GrupoInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _grupoRestService: GrupoRestService,
  ) {}

  ngOnInit() {
    this.buscarGrupo();
  }

  buscarGrupoPorCodigo() {
    let grupo$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      grupo$ = this._grupoRestService.findAll(
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
      grupo$ = this._grupoRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    grupo$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.grupoEncontrado.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarGrupo() {
    this._cargandoService.habilitarCargando();
    this.buscarGrupoPorCodigo();
  }
}
