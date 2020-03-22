import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BodegaInterface } from '../../../../interfaces/bodega.interface';
import { ToasterService } from 'angular2-toaster';
import { BodegaRestService } from '../../../../servicios/rest/bodega-rest.service';
import { ESTADOS } from '../../../../../../enums/estados';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from '../../../../../../constantes/mensajes-toaster';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-bodega',
  templateUrl: './filter-bodega.component.html',
  styleUrls: ['./filter-bodega.component.scss'],
})
export class FilterBodegaComponent implements OnInit {
  @Input() idEmpresa;

  @Input() mostrarSelectEstado = false;

  @Input() mostrarSelectEsPercha = true;

  skip = 0;

  camposABuscar = [];

  @Output() bodegasEncontradas: EventEmitter<
    [BodegaInterface[], number]
  > = new EventEmitter();

  busqueda = '';

  estadoSeleccionado = !this.mostrarSelectEstado ? ESTADOS.Activo : undefined;

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _bodegaRestService: BodegaRestService,
    private readonly _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.buscarNombreCodigo('');
  }

  buscarPorNombreCodigoEstadoEsPercha() {
    this._cargandoService.deshabilitarCargando();
    const consulta = {
      busqueda: this.busqueda,
      skip: this.skip,
      take: NUMERO_FILAS_TABLAS,
      idEmpresa: +this.idEmpresa,
      habilitado: 1,
      camposABuscar: this.camposABuscar,
      buscarPorStock: true,
    };
    this._bodegaRestService.obtenerBodegasPorEmpresa(consulta).subscribe(
      (resultado: [BodegaInterface[], number]) => {
        this._cargandoService.deshabilitarCargando();

        this.bodegasEncontradas.emit(resultado);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
    this._cargandoService.deshabilitarCargando();
  }

  escucharEstadoSeleccionado(estado) {
    this.camposABuscar = ['habilitado'];
    this.busqueda = estado;
    this.buscarPorNombreCodigoEstadoEsPercha();
  }

  escucharEsPerchaSeleccionado(esPercha) {
    this.camposABuscar = ['esPercha'];
    this.busqueda = esPercha;
    this.buscarPorNombreCodigoEstadoEsPercha();
  }

  buscarNombreCodigo(busqueda) {
    this.camposABuscar = ['nombre', 'codigo'];
    this.busqueda = busqueda.trim();
    this.buscarPorNombreCodigoEstadoEsPercha();
  }
}
