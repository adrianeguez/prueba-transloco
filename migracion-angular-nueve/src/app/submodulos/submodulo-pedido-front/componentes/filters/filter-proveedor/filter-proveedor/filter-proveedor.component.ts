import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {EmpresaProveedorInterface} from '../../../../servicios/rest/empresa-proveedores/interfaces/empresa-proveedor.interface';
import {EmpresaProveedorRestService} from '../../../../servicios/rest/empresa-proveedores/empresa-proveedor-rest.service';
import {CargandoService} from 'man-lab-ng';
import {ToasterService} from 'angular2-toaster';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {ToastErrorTrayendoDatos} from '../../../../../../constantes/mensajes-toaster';
import {
  obtenerNombresCamposABuscarQueryParams
} from '../../../../../submodulo-empresa-front/funciones/obtener-nombres-campos-a-buscar-query-params';

@Component({
  selector: 'ml-filter-proveedor',
  templateUrl: './filter-proveedor.component.html',
  styleUrls: ['./filter-proveedor.component.scss']
})
export class FilterProveedorComponent implements OnInit {

  @Input() idEmpresa: number;

  skip = 0;

  @Output()
  seEncontroProveedor: EventEmitter<[EmpresaProveedorInterface[], number]> = new EventEmitter();

  busqueda = '';

  constructor(
    private readonly _empresaProveedorRestService: EmpresaProveedorRestService,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.buscarEmpresaProveedora();
  }

  buscarPorRazonSocialRuc() {
    let respuestaBuscarPorRazonSocialRuc$;
    let consulta;
    if (this.busqueda === '') {
      consulta = {
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        relations: ['empresa', 'empresaProveedor']
      };
      respuestaBuscarPorRazonSocialRuc$ = this._empresaProveedorRestService
        .findAll(
          `criterioBusqueda=${JSON.stringify(consulta)}`
        );
    } else {
      const campos = ['ruc', 'razonSocial'];
      const camposABuscar = obtenerNombresCamposABuscarQueryParams(
        campos,
      );
      consulta = {
        busqueda: this.busqueda,
        skip: this.skip,
        take: NUMERO_FILAS_TABLAS,
        idEmpresa: this.idEmpresa,
        camposABuscar: campos
      };
      respuestaBuscarPorRazonSocialRuc$ = this._empresaProveedorRestService.obtenerEmpresasProveedoresPorRazonSocialRuc(consulta);
    }
    respuestaBuscarPorRazonSocialRuc$.subscribe(
      respuesta => {
        this._cargandoService.deshabilitarCargando();
        this.seEncontroProveedor.emit(respuesta);
      },
      error => {
        this._cargandoService.deshabilitarCargando();
        console.error({
          error,
          mensaje: 'Error consultando por cedula ruc o pasaporte',
        });
        this._toasterService.pop(ToastErrorTrayendoDatos);
      }
    );
  }

  buscarEmpresaProveedora() {
    this._cargandoService.habilitarCargando();
    this.buscarPorRazonSocialRuc();
  }

}
