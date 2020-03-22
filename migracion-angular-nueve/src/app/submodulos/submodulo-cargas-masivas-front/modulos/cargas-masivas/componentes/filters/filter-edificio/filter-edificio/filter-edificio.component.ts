import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../../../constantes/mensajes-toaster';
import { EdificioInterface } from '../../../../../../../submodulo-empresa-front/interfaces/edificio.interface';
import { EdificioRestService } from '../../../../../../../submodulo-empresa-front/servicios/rest/edificio-rest.service';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-edificio',
  templateUrl: './filter-edificio.component.html',
  styleUrls: ['./filter-edificio.component.scss'],
})
export class FilterEdificioComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() edificioEncontrado: EventEmitter<
    [EdificioInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _edificioRestService: EdificioRestService,
  ) {}

  ngOnInit() {
    this.buscarEdificio();
  }

  buscarEdificioPorNombre() {
    let edificio$;
    let consulta;

    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        habilitado: 1,
      };
      edificio$ = this._edificioRestService.findAll(
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
      edificio$ = this._edificioRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    }

    edificio$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.edificioEncontrado.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  buscarEdificio() {
    this._cargandoService.habilitarCargando();
    this.buscarEdificioPorNombre();
  }
}
