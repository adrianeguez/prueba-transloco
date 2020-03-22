import {Component, OnInit} from '@angular/core';
import {ESTADOS} from '../../../../../../enums/estados';
import {CargandoService, EmitirMigaPanService} from 'man-lab-ng';
import {ActivatedRoute, Router} from '@angular/router';
import {PuntoEmisionRestService} from '../../../../servicios/rest/punto-emision-rest.service';
import {ToasterService} from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import {NUMERO_FILAS_TABLAS} from '../../../../../submodulo-front-comun/constantes/numero-filas-tablas';
import {RUTAS_PUNTOS_EMISION} from '../../../punto-emision/rutas/definicion-rutas/rutas-punto-emision';
import {
  MigaDePanInterface,
  RutaConMigasDePanTablaBusqueda,
} from '@manticore-labs/ng-api';
import {RUTAS_PRINCIPAL} from '../../../../../submodulo-front-comun/rutas/definicion-rutas/rutas-principal';
import {RUTAS_EMPRESA} from '../../../empresa/rutas/definicion-rutas/rutas-empresa';
import {RUTAS_EDIFICIO} from '../../../edificio/rutas/definicion-rutas/rutas-edificio';
import {RUTAS_ESTABLECIMIENTO} from '../../../establecimiento/rutas/definicion-rutas/rutas-establecimiento';
import {
  toastErrorConexionServidor,
  toastErrorCrear,
  toastErrorEditar,
  toastExitoEditar,
} from '../../../../../../constantes/mensajes-toaster';
import {OperarioInterface} from '../../../../interfaces/operario.interface';
import {OperarioRestService} from '../../../../servicios/rest/operario-rest.service';
import {RUTAS_OPERARIO} from '../definicion-rutas/rutas-operario';
import {obtenerBusquedaQueryParams} from '../../../../funciones/obtener-busqueda-query-params';
import {obtenerNombresCamposABuscarQueryParams} from '../../../../funciones/obtener-nombres-campos-a-buscar-query-params';
import {CrearEditarOperarioComponent} from '../../modales/crear-editar-operario/crear-editar-operario.component';
import {WIDTH_MODAL_OPERARIO} from '../../constantes/tamanio-modal-operario';

@Component({
  selector: 'app-ruta-gestion-operarios',
  templateUrl: './ruta-gestion-operarios.component.html',
  styleUrls: ['./ruta-gestion-operarios.component.scss'],
})
export class RutaGestionOperariosComponent
  extends RutaConMigasDePanTablaBusqueda<OperarioInterface,
    OperarioRestService,
    ToasterService>
  implements OnInit {
  rows = NUMERO_FILAS_TABLAS;

  idEdificio;

  idEmpresa;

  idEstablecimiento;

  idPuntoEmision;

  estados = ESTADOS;

  columnas = [
    {field: 'nombres', header: 'Nombres'},
    {field: 'apellidos', header: 'Apellidos'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];
  nombreModuloPadre;

  constructor(
    private readonly _puntoEmisionRestService: PuntoEmisionRestService,
    protected _emitirMigaPanService: EmitirMigaPanService,
    protected _cargandoService: CargandoService,
    protected _activatedRoute: ActivatedRoute,
    protected _operarioRestService: OperarioRestService,
    protected _router: Router,
    protected _toasterServicePrivate: ToasterService,
    public dialog: MatDialog,
  ) {
    super(
      _emitirMigaPanService,
      _activatedRoute,
      _operarioRestService,
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
    this._activatedRoute.params.subscribe(params => {
      this.idEmpresa = +params.idEmpresa;
      this.idEdificio = +params.idEdificio;
      this.idEstablecimiento = +params.idEstablecimiento;
      this.idPuntoEmision = +params.idPuntoEmision;
      this._puntoEmisionRestService.findOne(this.idPuntoEmision).subscribe(
        puntoEmision => {
          this.nombreModuloPadre = puntoEmision.nombre;
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          console.error(error);
          this._cargandoService.deshabilitarCargando();
        },
      );
      this.ruta = RUTAS_OPERARIO.rutaGestionOperario(true, false, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
        this.idPuntoEmision,
      ]);
    });
    const rutas: MigaDePanInterface[] = <MigaDePanInterface[]>[
      RUTAS_PRINCIPAL.rutaMenuPrincipal(false, true),
      RUTAS_EMPRESA.rutaGestionEmpresa(false, true),
      RUTAS_EDIFICIO.rutaGestionEdificio(false, true, [this.idEmpresa]),
      RUTAS_ESTABLECIMIENTO
        .rutaGestionEstablecimiento(
          false,
          true, [
            this.idEmpresa,
            this.idEdificio,
          ]
        ),
      RUTAS_PUNTOS_EMISION.rutaGestionPuntoEmision(false, true, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
      ]),
      RUTAS_OPERARIO.rutaGestionOperario(false, true, [
        this.idEmpresa,
        this.idEdificio,
        this.idEstablecimiento,
        this.idPuntoEmision,
      ]),
    ];
    this.queryParams.where = this.queryParams.where
      ? this.queryParams.where
      : {puntoEmision: this.idPuntoEmision};
    this.queryParams.relations =
      this.queryParams.relations.length > 0
        ? this.queryParams.relations
        : ['contactoEmpresa', 'contactoEmpresa.datosUsuario'];
    this.establecerMigas(rutas);
    this.escucharCambiosEnQueryParams();
    this.escucharCambiosEnParametros();
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

  buscarPorNombreaApellidos(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.optionalParams = {registroActual: undefined};
    if (this.busqueda === '') {
      this.queryParams.take = NUMERO_FILAS_TABLAS;
      this.queryParams.skip = 0;
      this.tipoBusqueda = 'findAll';
      this.llamarDatos(
        0,
        {puntoEmision: this.idPuntoEmision},
        undefined,
        undefined,
        undefined,
        ['contactoEmpresa', 'contactoEmpresa.datosUsuario'],
        this.tipoBusqueda
      );
    } else {
      this.tipoBusqueda = 'custom';
      this.queryParams.camposABuscar = [
        {campo: 'nombres', valor: `%25${this.busqueda}%25`},
        {campo: 'apellidos', valor: `%25${this.busqueda}%25`},
      ];
      this.busquedaPersonalizada();
      this.llamarDatos(0, undefined, this.queryParams.camposABuscar, undefined, undefined, undefined, this.tipoBusqueda);
    }
  }

  busquedaPersonalizada(): void {
    this._cargandoService.habilitarCargando();
    const busqueda = obtenerBusquedaQueryParams(this.queryParams);
    const camposABuscar = obtenerNombresCamposABuscarQueryParams(
      this.queryParams.camposABuscar,
    );
    const datos = {
      busqueda,
      camposABuscar,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
      idPuntoEmision: this.idPuntoEmision,
    };
    this._operarioRestService.obtenerOperarios(datos).subscribe(
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

  abrirModalCrearPuntoEmision() {
    const dialogRef = this.dialog.open(CrearEditarOperarioComponent, {
      width: WIDTH_MODAL_OPERARIO,
      data: {idEmpresa: this.idEmpresa, idPuntoEmision: this.idPuntoEmision},
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: OperarioInterface) => {
        if (registroCreado) {
          this.values.unshift(registroCreado);
          this.optionalParams.registroActual = registroCreado.id;
        }
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastErrorCrear);
      },
    );
  }

  abrirModalEditarPuntoEmision(registro) {
    const indiceRegistro = this.values.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarOperarioComponent, {
      width: WIDTH_MODAL_OPERARIO,
      data: {
        operario: registro,
        idEmpresa: this.idEmpresa,
        idPuntoEmision: this.idPuntoEmision,
      },
    });
    dialogRef.afterClosed().subscribe(
      (registroEditado: OperarioInterface) => {
        if (registroEditado) {
          this.values[indiceRegistro] = registroEditado;
          this.optionalParams.registroActual = registroEditado.id;
        }
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastExitoEditar);
      },
    );
  }

  actualizarCampo(registro, campo: string) {
    this._cargandoService.habilitarCargando();
    const indice = this.values.indexOf(registro);
    const operario: OperarioInterface = {};
    operario[campo] = registro[campo] === 0;
    this._operarioRestService.updateOne(registro.id, operario).subscribe(
      () => {
        this._cargandoService.deshabilitarCargando();
        this.values[indice][campo] = operario[campo] ? 1 : 0;
        this._toasterService.pop(toastExitoEditar);
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastErrorEditar);
      },
    );
  }

  escucharEstadoSeleccionado(event) {
    this.optionalParams = {registroActual: undefined};
    const seSeleccionoEstado =
      event === ESTADOS.Activo || event === ESTADOS.Inactivo;
    const where = seSeleccionoEstado
      ? {habilitado: event, puntoEmision: this.idPuntoEmision}
      : {puntoEmision: this.idPuntoEmision};
    this.tipoBusqueda = 'findAll';
    this.llamarDatos(0, where, undefined, undefined, this.queryParams.order, [
      'contactoEmpresa',
      'contactoEmpresa.datosUsuario',
    ], this.tipoBusqueda);
  }
}
