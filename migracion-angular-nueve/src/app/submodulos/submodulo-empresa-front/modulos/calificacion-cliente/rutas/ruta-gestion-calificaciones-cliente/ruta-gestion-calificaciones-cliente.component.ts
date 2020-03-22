import { Component, OnInit } from '@angular/core';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import { ToasterService } from 'angular2-toaster';
import { CalificacionClienteRestService } from '../../../../servicios/rest/calificacion-cliente-rest.service';
import { CargandoService, EmitirMigaPanService } from 'man-lab-ng';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RUTAS_EMPRESA_CLIENTES } from '../../../empresa-clientes/rutas/definicion-rutas/rutas-empresa-clientes';
import { RUTAS_EMPRESA } from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import { RUTAS_CALIFICACION_CLIENTE } from '../definicion-rutas/rutas-calificacion-cliente';
import { CrearEditarCalificacionClienteComponent } from '../../modales/crear-editar-calificacion-cliente/crear-editar-calificacion-cliente.component';
import { CalificacionClienteInterface } from '../../../../interfaces/calificacion-cliente.interface';
import { NUMERO_FILAS_TABLAS } from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import { RUTAS_PRINCIPAL } from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
} from '../../../../../../constantes/mensajes-toaster';
import { WIDTH_MODAL_CALIFICACION_CLIENTE } from '../../constantes/tamanio-modal-calificaion-cliente';
import { EmpresaClientesRestService } from '../../../../servicios/rest/empresa-clientes-rest.service';
import { EmpresaInterface } from '../../../../interfaces/empresa.interface';

@Component({
  selector: 'ml-ruta-gestion-calificaciones-cliente',
  templateUrl: './ruta-gestion-calificaciones-cliente.component.html',
  styleUrls: ['./ruta-gestion-calificaciones-cliente.component.sass'],
})
export class RutaGestionCalificacionesClienteComponent
  extends RutaConMigasDePanTablaBusqueda<
    CalificacionClienteInterface,
    CalificacionClienteRestService,
    ToasterService
    >
  implements OnInit {
  idEmpresa;

  idEmpresaClientes;

  columnas = [
    { field: 'calificacion', header: 'Calificación' },
    { field: 'observacion', header: 'Observación' },
    { field: 'id', header: 'Acciones' },
  ];
  nombreModuloPadre;

  constructor(
    private readonly _empresaCLienteRestService: EmpresaClientesRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _calificacionClienteRestService: CalificacionClienteRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _calificacionClienteRestService,
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
        this._cargandoService.deshabilitarCargando();
        this.idEmpresa = params.idEmpresa;
        this.idEmpresaClientes = params.idEmpresaClientes;
        const consulta = {
          where: {
            id: this.idEmpresaClientes,
          },
          relations: ['empresaCliente'],
        };
        this._empresaCLienteRestService
          .findAll('criterioBusqueda=' + JSON.stringify(consulta))
          .subscribe(respuesta => {
            const empresa = respuesta[0][0].empresaCliente as EmpresaInterface;
            this.nombreModuloPadre = empresa.razonSocial;
            this._cargandoService.deshabilitarCargando();
          });
        this.ruta = RUTAS_CALIFICACION_CLIENTE.rutaGestionCalificacionCliente(
          true,
          false,
          [this.idEmpresa, this.idEmpresaClientes],
        );
        const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
          RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
          RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
          RUTAS_EMPRESA_CLIENTES.rutaGestionEmpresaClientes(false, true, [
            this.idEmpresa,
          ]),
          RUTAS_CALIFICACION_CLIENTE.rutaGestionCalificacionCliente(
            false,
            true,
            [this.idEmpresa, this.idEmpresaClientes],
          ),
        ];
        this.queryParams.where = this.queryParams.where
          ? this.queryParams.where
          : { empresaCliente: this.idEmpresaClientes };
        this.establecerMigas(rutas);
        this.escucharCambiosEnQueryParams();
        this.escucharCambiosEnParametros();
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

  abrirModalCrearCalificacionCliente() {
    const dialogRef = this.dialog.open(
      CrearEditarCalificacionClienteComponent,
      {
        width: WIDTH_MODAL_CALIFICACION_CLIENTE,
        data: { idEmpresaCliente: this.idEmpresaClientes },
      },
    );

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: CalificacionClienteInterface) => {
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

  abrirModalEditarCalificacionCliente(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(
      CrearEditarCalificacionClienteComponent,
      {
        width: WIDTH_MODAL_CALIFICACION_CLIENTE,
        data: {
          calificacionCliente: registro,
          idEmpresaCliente: this.idEmpresaClientes,
        },
      },
    );
    dialogRef.afterClosed().subscribe(
      (registroEditado: CalificacionClienteInterface) => {
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
      { calificacion, empresaCliente: this.idEmpresaClientes },
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
          key: 'empresaCliente',
          entidad: 'empresaCliente',
          query: [{ campo: 'id', valor: this.idEmpresaClientes }],
        },
      ],
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
    };
    this._calificacionClienteRestService
      .findWhereOr('criterioBusqueda=' + JSON.stringify(consulta))
      .subscribe(
        (resultado: [CalificacionClienteInterface[], number]) => {
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
