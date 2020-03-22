import { ArticuloInterface } from './../../../../interfaces/articulo.interface';
import { ArticulosRestService } from './../../../../servicios/rest/articulos-rest.service';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { toastErrorConexionServidor } from './../../../../../../constantes/mensajes-toaster';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { CargandoService } from 'man-lab-ng';
import { NUMERO_FILAS_ARTICULO_EMPRESA } from '../../../../constantes/numero-filas-articulos-empresa';

@Component({
  selector: 'ml-filter-articulo-empresa',
  templateUrl: './filter-articulo-empresa.component.html',
  styleUrls: ['./filter-articulo-empresa.component.scss'],
})
export class FilterArticuloEmpresaComponent implements OnInit {
  skip = 0;
  busqueda = '';
  @Output() articulosEncontradas: EventEmitter<
    [ArticuloInterface[], number]
  > = new EventEmitter();

  constructor(
    private readonly _cargandoService: CargandoService,
    // private readonly _articulosEmpresaRestService: ArticulosEmpresaRestService,
    private readonly _toasterService: ToasterService,
    private readonly _articulosRestService: ArticulosRestService,
  ) {}

  ngOnInit() {
    this.buscarPorNombreCodigoEstado();
  }

  buscarPorNombreCodigoEstado() {
    this._cargandoService.habilitarCargando();
    const consulta = {
      busqueda: this.busqueda,
      skip: this.skip,
      take: NUMERO_FILAS_ARTICULO_EMPRESA,
      habilitado: 1,
    };
    this._articulosRestService
      .buscarArticulosActivosPorNombreCodigo(consulta)
      .subscribe(
        (resultado: [ArticuloInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          this.articulosEncontradas.emit(resultado);
        },
        error => {
          console.log(error);
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }
}
