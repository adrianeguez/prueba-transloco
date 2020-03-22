import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { SubgrupoInterface } from '../../../../../../../submodulo-articulos-front/interfaces/subgrupo.interface';
import { SubgrupoRestService } from '../../../../../../../submodulo-articulos-front/servicios/rest/subgrupo-rest.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-subgrupos',
  templateUrl: './filter-subgrupos.component.html',
  styleUrls: ['./filter-subgrupos.component.scss'],
})
export class FilterSubgruposComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() subgrupoEncontrado: EventEmitter<
    [SubgrupoInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _subgrupoRestService: SubgrupoRestService,
  ) {}

  ngOnInit() {
    this.buscarSubgrupo();
  }

  buscarSubrupoPorCodigo() {
    let subgrupo$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      subgrupo$ = this._subgrupoRestService.findAll(
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
      subgrupo$ = this._subgrupoRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    subgrupo$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.subgrupoEncontrado.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarSubgrupo() {
    this._cargandoService.habilitarCargando();
    this.buscarSubrupoPorCodigo();
  }
}
