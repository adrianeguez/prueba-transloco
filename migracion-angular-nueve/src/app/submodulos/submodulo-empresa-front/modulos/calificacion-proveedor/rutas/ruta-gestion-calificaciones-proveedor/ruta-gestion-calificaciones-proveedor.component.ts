import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CalificacionProveedorRestService } from '../../../../servicios/rest/calificacion-proveedor-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_CALIFICACION_PROVEEDOR } from '../definicion-rutas/rutas-calificacion-proveedor';
import { RUTAS_EMPRESA_PROVEEDORES } from '../../../empresa-proveedores/rutas/definicion-rutas/rutas-empresa-proveedores';
import { CrearEditarCalificacionProveedorComponent } from '../../modales/crear-editar-calificacion-proveedor/crear-editar-calificacion-proveedor.component';
import { CalificacionProveedorInterface } from '../../../../interfaces/calificacion-proveedor.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { WIDTH_MODAL_CALIFICACION_PROVEEDOR } from '../../constantes/tamanio-modal-calificacion-proveedor';
import { EmpresaProveedoresRestService } from '../../../../servicios/rest/empresa-proveedores-rest.service';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';

@Component({
  selector: 'ml-ruta-gestion-calificaciones-proveedor',
  templateUrl: './ruta-gestion-calificaciones-proveedor.component.html',
  styleUrls: ['./ruta-gestion-calificaciones-proveedor.component.sass'],
})
export class RutaGestionCalificacionesProveedorComponent
  extends RutaConMigasDePanTablaBusqueda<
    CalificacionProveedorInterface,
    CalificacionProveedorRestService,
    ToasterService
  >
  implements OnInit {
  idEmpresa;

  idEmpresaProveedores;

  columnas = [
    { field: 'calificacion', header: 'Calificación' },
    { field: 'observacion', header: 'Observación' },
    { field: 'id', header: 'Acciones' },
  ];

  nombreModuloPadre;

  constructor(
    private readonly _empresaProveedorRestService: EmpresaProveedoresRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _calificacionProveedorRestService: CalificacionProveedorRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _calificacionProveedorRestService,
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
        this.idEmpresaProveedores = params.idEmpresaProveedores;
        const consulta = {
          where: {
            id: this.idEmpresaProveedores,
          },
          relations: ['empresaProveedor'],
        };
        this._empresaProveedorRestService
          .findAll('criterioBusqueda=' + JSON.stringify(consulta))
          .subscribe(respuesta => {
            const empresa = respuesta[0][0]
              .empresaProveedor as EmpresaInterface;
            this.nombreModuloPadre = empresa.razonSocial;
            this._cargandoService.deshabilitarCargando();
          });
        this.ruta = RUTAS_CALIFICACION_PROVEEDOR.rutaGestionCalificacionProveedor(
          true,
          false,
          [this.idEmpresa, this.idEmpresaProveedores],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EMPRESA_PROVEEDORES.rutaGestionEmpresaProveedores(false, true, [
            this.idEmpresa,
          ]),
          RUTAS_CALIFICACION_PROVEEDOR.rutaGestionCalificacionProveedor(
            false,
            true,
            [this.idEmpresa, this.idEmpresaProveedores],
          ),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { empresaProveedor: this.idEmpresaProveedores };
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
      },
    );
    this._cargandoService.deshabilitarCargando();
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

  abrirModalCrearCalificacionProveedor() {
    const dialogRef = this.dialog.open(
      CrearEditarCalificacionProveedorComponent,
      {
        width: WIDTH_MODAL_CALIFICACION_PROVEEDOR,
        data: { idEmpresaProveedor: this.idEmpresaProveedores },
      },
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: CalificacionProveedorInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorCrear);
      },
    );
  }

  abrirModalEditarCalificacionProveedor(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(
      CrearEditarCalificacionProveedorComponent,
      {
        width: WIDTH_MODAL_CALIFICACION_PROVEEDOR,
        data: {
          calificacionProveedor: registro,
          idEmpresaProveedor: this.idEmpresaProveedores,
        },
      },
    );
    dialogRef.afterClosed().subscribe(
      (registroEditado: CalificacionProveedorInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  buscarPorCalificacion(calificacion: number) {
    this.optionalParams = { registroActual: undefined };
    this.queryParams.take = NUMERO_FILAS_TABLAS;
    this.queryParams.skip = 0;
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(
      0,
      { calificacion, empresaProveedor: this.idEmpresaProveedores },
      undefined,
      undefined,
      undefined,
      undefined,
      this.tipoBusqueda
    );
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const consulta = {
      camposABuscar: this.queryParams.camposABuscar,
      relations: [
        {
          key: 'empresaProveedor',
          entidad: 'empresaProveedor',
          query: [{ campo: 'id', valor: this.idEmpresaProveedores }],
        },
      ],
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._calificacionProveedorRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (resultado: [CalificacionProveedorInterface[], number]) => {
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
}
