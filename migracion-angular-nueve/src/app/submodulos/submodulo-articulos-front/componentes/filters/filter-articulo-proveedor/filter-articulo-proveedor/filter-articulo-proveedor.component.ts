import { toastErrorConexionServidor } from './../../../../../../constantes/mensajes-toaster';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { ArticulosProveedorRestService } from './../../../../servicios/rest/articulo-proveedor-rest.service';
import { ArticuloProveedorInterface } from '../../../../interfaces/articulo-proveedor.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-articulo-proveedor',
  templateUrl: './filter-articulo-proveedor.component.html',
  styleUrls: ['./filter-articulo-proveedor.component.scss'],
})
export class FilterArticuloProveedorComponent implements OnInit {
  @Input() idEmpresaProveedor;
  skip = 0;

  @Output() articulosProveedorEncontradas: EventEmitter<
    [ArticuloProveedorInterface[], number]
  > = new EventEmitter();

  busqueda = '';

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _articulosProveedorRestService: ArticulosProveedorRestService,
    private readonly _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.buscarPorNombreCodigoEstado();
  }

  buscarPorNombreCodigoEstado() {
    this._cargandoService.habilitarCargando();
    const consulta = {
      busqueda: this.busqueda,
      skip: this.skip,
      take: NUMERO_FILAS_TABLAS,
      idEmpresaProveedor: this.idEmpresaProveedor,
      habilitado: 1,
    };
    this._articulosProveedorRestService
      .obtenerArticuloProveedorPorNombreCodigo(consulta)
      .subscribe(
        respuesta => {
          this._cargandoService.deshabilitarCargando();
          this.articulosProveedorEncontradas.emit(respuesta);
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.log(error);
          this._toasterService.pop(toastErrorConexionServidor);
        },
      );
  }
}
