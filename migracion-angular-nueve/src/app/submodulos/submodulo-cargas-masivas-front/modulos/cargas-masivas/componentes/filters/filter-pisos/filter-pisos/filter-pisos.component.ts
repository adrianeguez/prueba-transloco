import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { PisoRestService } from '../../../../../../../submodulo-empresa-front/servicios/rest/piso-rest.service';
import { PisoInterface } from '../../../../../../../submodulo-empresa-front/interfaces/piso.interface';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-pisos',
  templateUrl: './filter-pisos.component.html',
  styleUrls: ['./filter-pisos.component.scss'],
})
export class FilterPisosComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() pisoEncontrado: EventEmitter<
    [PisoInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _pisoRestService: PisoRestService,
  ) {}

  ngOnInit() {
    this.buscarPiso();
  }

  buscarPisoPorNombre() {
    let piso$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      piso$ = this._pisoRestService.findAll(
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
        nombre: `Like(\"%25${this.busqueda}%25\")`,
      };
      piso$ = this._pisoRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    piso$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.pisoEncontrado.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarPiso() {
    this._cargandoService.habilitarCargando();
    this.buscarPisoPorNombre();
  }
}
