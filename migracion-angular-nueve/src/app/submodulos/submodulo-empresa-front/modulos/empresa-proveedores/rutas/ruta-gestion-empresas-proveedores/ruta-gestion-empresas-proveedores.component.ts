import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { EmpresaProveedoresRestService } from '../../../../servicios/rest/empresa-proveedores-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_EMPRESA_PROVEEDORES } from '../definicion-rutas/rutas-empresa-proveedores';
import { CrearEditarEmpresaProveedoresComponent } from '../../modales/crear-editar-empresa-proveedores/crear-editar-empresa-proveedores.component';
import { EmpresaProveedoresInterface } from '../../../../interfaces/empresa-proveedores.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { ESTADOS } from '../../../../../../enums/estados';
import { WIDTH_MODAL_EMPRESA_PROVEEDOR } from '../../constantes/tamanio-modal-empresa-proveedor';
import { EmpresaRestService } from '../../../../servicios/rest/empresa-rest.service';
import { obtenerNombresCamposABuscarQueryParams } from '../../../../funciones/obtener-nombres-campos-a-buscar-query-params';

@Component({
  selector: 'ml-ruta-gestion-empresas-proveedores',
  templateUrl: './ruta-gestion-empresas-proveedores.component.html',
  styleUrls: ['./ruta-gestion-empresas-proveedores.component.sass'],
})
export class RutaGestionEmpresasProveedoresComponent
  extends RutaConMigasDePanTablaBusqueda<
    EmpresaProveedoresInterface,
    EmpresaProveedoresRestService,
    ToasterService
    >
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEmpresa;

  estados = ESTADOS;

  columnas = [
    { field: 'razonSocial', header: 'Razón Social' },
    { field: 'ruc', header: 'R.U.C.' },
    { field: 'direccionMatriz', header: 'Dirección matriz' },
    { field: 'telefono', header: 'Teléfono matriz' },
    { field: 'contactoMatriz', header: 'Contacto Matriz' },
    { field: 'calificacionTotal', header: 'Calificación Total' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _empresaRestService: EmpresaRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _empresaProveedoresRestService: EmpresaProveedoresRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _empresaProveedoresRestService,
      _router,
      _toasterServicePrivate,
      0, // SKIP
      NUMERO_FILAS_TABLAS,
    ); // TAKE
    this.queryParams.order = {
      id: 'DESC',
    };
  }

  ngOnInit() {
    this._cargandoService.habilitarCargando();
    this._activatedRoute.params.subscribe(
      params => {
        this.idEmpresa = params.idEmpresa;
        this._empresaRestService.findOne(this.idEmpresa).subscribe(
          empresa => {
            this.nombreModuloPadre = empresa.razonSocial;
            this._cargandoService.deshabilitarCargando();
          },
          error => {
            console.error(error);
            this._cargandoService.deshabilitarCargando();
          },
        );
        this.ruta = RUTAS_EMPRESA_PROVEEDORES.rutaGestionEmpresaProveedores(
          true,
          false,
          [this.idEmpresa],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EMPRESA_PROVEEDORES.rutaGestionEmpresaProveedores(false, true, [
            this.idEmpresa,
          ]),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { empresa: this.idEmpresa };
        this.queryParams.relations =
          this.queryParams.relations.length > 0
            ? this.queryParams.relations
            : ['empresaProveedor', 'empresaProveedor.edificios'];
        this.busqueda = this.busqueda ? this.busqueda : '';
        this.queryParams.camposABuscar = this.queryParams.camposABuscar
          ? this.queryParams.camposABuscar
          : [
            { campo: 'ruc', valor: this.busqueda },
            { campo: 'razonSocial', valor: this.busqueda },
          ];
        this.tipoBusqueda = 'custom';
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.llamarDatos(
      this.queryParams.skip,
      this.queryParams.where,
      this.queryParams.camposABuscar,
      this.optionalParams,
      this.queryParams.order,
      this.queryParams.relations,
      this.tipoBusqueda
    );
    this.loading = false;
  }

  abrirModalCrearEmpresaProveedor() {
    const dialogRef = this.dialog.open(CrearEditarEmpresaProveedoresComponent, {
      width: WIDTH_MODAL_EMPRESA_PROVEEDOR,
      data: { idEmpresa: this.idEmpresa },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: EmpresaProveedoresInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorCrear);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  abrirModalEditarEmpresaProveedor(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarEmpresaProveedoresComponent, {
      width: WIDTH_MODAL_EMPRESA_PROVEEDOR,
      data: { empresaProveedores: registro, idEmpresa: this.idEmpresa },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: EmpresaProveedoresInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
        this._cargandoService.deshabilitarCargando();
      },
    );
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    this._empresaProveedoresRestService
      .updateOne(registro.id, { habilitado })
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.values[indice].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(toastExitoEditar);
        },
        error => {
          console.error(error);
          this._toasterService.pop(toastErrorEditar);
          this._cargandoService.deshabilitarCargando();
        },
      );
  }

  buscarPorRUCRazonSocial(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = { registroActual: undefined };
    this.tipoBusqueda = 'custom';
    this.queryParams.camposABuscar = [
      { campo: 'ruc', valor: this.busqueda },
      { campo: 'razonSocial', valor: this.busqueda },
    ];
    this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const camposABuscar = obtenerNombresCamposABuscarQueryParams(
      this.queryParams.camposABuscar,
    );
    const datos = {
      busqueda: this.busqueda
        ? this.busqueda
        : this.queryParams.camposABuscar[0].valor,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
      idEmpresa: this.idEmpresa,
      camposABuscar,
    };
    this._empresaProveedoresRestService
      .obtenerEmpresasProveedoresPorRazonSocialRuc(datos)
      .subscribe(
        resultado => {
          this._cargandoService.deshabilitarCargando();
          this.values = resultado[0];
          this.totalRecords = resultado[1];
          this.first = 0;
          this.loading = false;
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error(error);
          this._toasterService.pop(toastErrorConexionServidor);
          this.loading = false;
        },
      );
  }

  escucharEstadoSeleccionado(event) {
    this.busqueda = event;
    this.tipoBusqueda = 'custom';
    this.queryParams.camposABuscar = [
      { campo: 'habilitado', valor: event === 1 || event === 0 ? event : '' },
    ];
    this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
  }

  irAGestionModuloHijo(
    idEmpresaProveedores: number,
    moduloHijo: string,
    gestionHijo,
  ) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'empresa-proveedores-modulo',
      idEmpresaProveedores,
      moduloHijo + '-modulo',
      'gestion-' + gestionHijo,
    ];
    this._router.navigate(ruta);
  }

  irAGestionArticulosProveedor(rowData) {
    const ruta = [
      'empresa-modulo',
      this.idEmpresa,
      'empresa-proveedores-modulo',
      'gestion-empresas-proveedor',
      'articulo-proveedor-modulo',
      rowData.id,
      'gestion-articulo-proveedor'
    ];
    this._router.navigate(ruta);
  }
}
