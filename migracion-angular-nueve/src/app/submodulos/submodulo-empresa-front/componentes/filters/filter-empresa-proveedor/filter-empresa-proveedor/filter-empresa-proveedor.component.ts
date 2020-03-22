import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmpresaProveedoresInterface } from '../../../../interfaces/empresa-proveedores.interface';
import { EmpresaProveedoresRestService } from '../../../../servicios/rest/empresa-proveedores-rest.service';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {
  toastErrorConexionServidor,
  toastExitoReset,
} from '../../../../../../constantes/mensajes-toaster';
import { ToasterService } from 'angular2-toaster';
import { CargandoService } from 'man-lab-ng';

@Component({
  selector: 'ml-filter-empresa-proveedor',
  templateUrl: './filter-empresa-proveedor.component.html',
  styleUrls: ['./filter-empresa-proveedor.component.sass'],
})
export class FilterEmpresaProveedorComponent implements OnInit {
  @Input() idEmpresa;

  @Input() mostrarSelectEstado = false;

  skip = 0;

  @Output() empresasProveedoresEncontradas: EventEmitter<
    [EmpresaProveedoresInterface[], number]
  > = new EventEmitter();

  busqueda = '';

  buscarPorEstado = false;

  estadoSeleccionado = !this.mostrarSelectEstado ? 1 : undefined;

  constructor(
    private readonly _cargandoService: CargandoService,
    private readonly _empresaProveedoresRestService: EmpresaProveedoresRestService,
    private readonly _toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.buscarPorRUCRazonSocialEstado();
  }

  buscarPorRUCRazonSocialEstado() {
    let empresasProveedores$;
    let consulta;
    if (this.busqueda === '' || this.buscarPorEstado) {
      consulta = {
        relations: ['empresaProveedor', 'empresa'],
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
      };
      consulta.where = this.buscarPorEstado
        ? { empresa: this.idEmpresa, habilitado: this.estadoSeleccionado }
        : this.mostrarSelectEstado
        ? { empresa: this.idEmpresa }
        : { empresa: this.idEmpresa, habilitado: 1 };
      empresasProveedores$ = this._empresaProveedoresRestService.findAll(
        'criterioBusqueda=' + JSON.stringify(consulta),
      );
    } else {
      consulta = {
        busqueda: this.busqueda,
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        idEmpresa: this.idEmpresa,
        habilitado: 1,
      };
      empresasProveedores$ = this._empresaProveedoresRestService.obtenerEmpresasProveedoresPorRazonSocialRuc(
        consulta,
      );
    }
    empresasProveedores$.subscribe(
      resultado => {
        this._cargandoService.deshabilitarCargando();
        this.empresasProveedoresEncontradas.emit(resultado);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorConexionServidor);
      },
    );
  }

  escucharEstadoSeleccionado(estado) {
    this._cargandoService.habilitarCargando();
    this.estadoSeleccionado = estado;
    this.buscarPorEstado = true;
    this.buscarPorRUCRazonSocialEstado();
  }

  buscarRazonSocialRuc() {
    this._cargandoService.habilitarCargando();
    this.buscarPorEstado = false;
    this.buscarPorRUCRazonSocialEstado();
  }
}
